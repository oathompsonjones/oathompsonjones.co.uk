import { expect as assert, describe, it } from "vitest";
import { JSON_TOOL_MAX_REQUEST_BYTES } from "tools/json-toolkit";
import { POST as post } from "./route";

/**
 * Creates a request to the JSON tool endpoint.
 * @param body - Serialized body content sent to the endpoint.
 * @param headers - Headers applied to the request.
 * @returns A POST request with the supplied body and headers.
 */
function createRequest(
    body: string,
    headers: HeadersInit = new Headers([["Content-Type", "application/json"]]),
): Request {
    return new Request("http://localhost/api/tools/json", {
        body,
        headers,
        method: "POST",
    });
}

/**
 * Reads a response body as unknown JSON.
 * @param response - The API response.
 * @returns The decoded response body.
 */
async function readResponse(response: Response): Promise<unknown> {
    const payload: unknown = await response.json();

    return payload;
}

/**
 * Checks whether a value is a plain object-shaped record.
 * @param value - The value to check.
 * @returns Whether the value is a non-null, non-array object.
 */
function isRecord(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

describe("POST /api/tools/json", () => {
    it("formats JSON and returns the shared success envelope without caching", async () => {
        const response = await post(createRequest(JSON.stringify({
            operation: "format",
            text: "{\"name\":\"Ada\"}",
        })));

        assert(response.status).toBe(200);
        assert(response.headers.get("Cache-Control")).toBe("no-store");
        await assert(readResponse(response)).resolves.toEqual({
            data: {
                notices: [],
                output: "{\n  \"name\": \"Ada\"\n}",
                valid: true,
            },
            success: true,
        });
    });

    it("returns a structured 415 when the request is not JSON", async () => {
        const response = await post(createRequest("{}", new Headers([["Content-Type", "text/plain"]])));

        assert(response.status).toBe(415);
        await assert(readResponse(response)).resolves.toMatchObject({
            error: { code: "UNSUPPORTED_MEDIA_TYPE" },
            success: false,
        });
    });

    it("returns a structured 400 for a malformed request body", async () => {
        const response = await post(createRequest("{"));

        assert(response.status).toBe(400);
        await assert(readResponse(response)).resolves.toMatchObject({
            error: { code: "INVALID_JSON" },
            success: false,
        });
    });

    it("returns schema issues for an invalid request", async () => {
        const response = await post(createRequest(JSON.stringify({
            operation: "unknown",
            text: "{}",
        })));
        const payload = await readResponse(response);

        assert(response.status).toBe(400);

        if (!isRecord(payload) || !isRecord(payload.error) || !Array.isArray(payload.error.details))
            throw new Error("Expected validation error details in the response.");

        assert(payload.error.code).toBe("VALIDATION_ERROR");
        assert(payload.error.details[0]).toMatchObject({ path: ["operation"] });
    });

    it("returns a structured 413 when the request exceeds the configured byte limit", async () => {
        const response = await post(createRequest("{}", new Headers([
            ["Content-Type", "application/json"],
            ["Content-Length", String(JSON_TOOL_MAX_REQUEST_BYTES + 1)],
        ])));

        assert(response.status).toBe(413);
        await assert(readResponse(response)).resolves.toMatchObject({
            error: { code: "PAYLOAD_TOO_LARGE" },
            success: false,
        });
    });

    it("returns a structured 400 when the submitted text is not valid JSON", async () => {
        const response = await post(createRequest(JSON.stringify({
            operation: "validate",
            text: "{\n  \"name\": }",
        })));
        const payload = await readResponse(response);

        assert(response.status).toBe(400);

        if (!isRecord(payload) || !isRecord(payload.error) || !isRecord(payload.error.details))
            throw new Error("Expected JSON parse location details in the response.");

        assert(payload.error.code).toBe("INVALID_JSON");
        assert(typeof payload.error.details.column).toBe("number");
        assert(typeof payload.error.details.line).toBe("number");
    });

    it("returns a structured 422 when the requested conversion cannot represent the input", async () => {
        const response = await post(createRequest(JSON.stringify({
            operation: "convert",
            target: "csv",
            text: "[{\"name\":\"Ada\"},1]",
        })));

        assert(response.status).toBe(422);
        await assert(readResponse(response)).resolves.toMatchObject({
            error: { code: "UNSUPPORTED_CONVERSION" },
            success: false,
        });
    });
});
