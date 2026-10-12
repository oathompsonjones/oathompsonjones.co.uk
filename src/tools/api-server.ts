import type { ToolApiFailure, ToolApiSuccess } from "tools/api";
import { NextResponse } from "next/server";
import type { z } from "zod";

export type ToolRequestResult<T> =
    | { data: T; success: true; }
    | { response: NextResponse; success: false; };

/**
 * Creates a successful response using the shared tool API envelope.
 * @template T - The shape of the operation result.
 * @param data - The operation result.
 * @returns A JSON response containing the result.
 */
export function toolSuccess<T>(data: T): NextResponse<ToolApiSuccess<T>> {
    return NextResponse.json({ data, success: true }, { headers: new Headers([["Cache-Control", "no-store"]]) });
}

/**
 * Creates a structured error response using the shared tool API envelope.
 * @param code - A stable machine-readable error code.
 * @param message - A concise, safe-to-display explanation.
 * @param status - The HTTP response status.
 * @param details - Optional structured validation details.
 * @returns A JSON error response.
 */
export function toolError(
    code: string,
    message: string,
    status: number,
    details?: unknown,
): NextResponse<ToolApiFailure> {
    return NextResponse.json({
        error: {
            code,
            ...details === undefined ? {} : { details },
            message,
        },
        success: false,
    }, { headers: new Headers([["Cache-Control", "no-store"]]), status });
}

type ToolBodyResult = { body: string; tooLarge: false; } | { tooLarge: true; };

/**
 * Reads a request body up to its configured UTF-8 byte limit.
 * @param request - The incoming API request.
 * @param maxBytes - The maximum encoded body size.
 * @returns The decoded body or an indication that it exceeded the limit.
 */
async function readLimitedBody(request: Request, maxBytes: number): Promise<ToolBodyResult> {
    const contentLength = request.headers.get("content-length");

    if (contentLength !== null && Number(contentLength) > maxBytes)
        return { tooLarge: true };

    if (request.body === null)
        return { body: "", tooLarge: false };

    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let byteLength = 0;
    let tooLarge = false;

    while (!tooLarge) {
        // Sequential reads enforce the limit before buffering additional chunks.
        // eslint-disable-next-line no-await-in-loop
        const { done, value } = await reader.read();

        if (done)
            break;

        byteLength += value.byteLength;
        tooLarge = byteLength > maxBytes;

        if (!tooLarge)
            chunks.push(value);
    }

    if (tooLarge) {
        await reader.cancel();

        return { tooLarge: true };
    }

    const bytes = new Uint8Array(byteLength);
    let offset = 0;

    for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.byteLength;
    }

    return { body: new TextDecoder().decode(bytes), tooLarge: false };
}

/**
 * Checks the JSON content type, parses a request body, and validates its schema.
 * @template TSchema - The Zod schema type.
 * @param request - The incoming API request.
 * @param schema - The Zod schema for this endpoint's input.
 * @param options - Optional maximum UTF-8 body size.
 * @param options.maxBytes - The maximum encoded body size, when configured.
 * @returns Validated data or a ready-to-return error response.
 */
export async function parseToolRequest<TSchema extends z.ZodType>(
    request: Request,
    schema: TSchema,
    options: { maxBytes?: number; } = {},
): Promise<ToolRequestResult<z.output<TSchema>>> {
    const contentType = request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase();

    if (contentType !== "application/json") {
        return {
            response: toolError(
                "UNSUPPORTED_MEDIA_TYPE",
                "Content-Type must be application/json.",
                415,
            ),
            success: false,
        };
    }

    const bodyResult = options.maxBytes === undefined
        ? { body: await request.text(), tooLarge: false as const }
        : await readLimitedBody(request, options.maxBytes);

    if (bodyResult.tooLarge) {
        return {
            response: toolError("PAYLOAD_TOO_LARGE", "The request body exceeds the size limit.", 413),
            success: false,
        };
    }

    let payload: unknown;

    try {
        payload = JSON.parse(bodyResult.body);
    } catch (error) {
        if (!(error instanceof SyntaxError))
            throw error;

        return {
            response: toolError(
                "INVALID_JSON",
                "The request body must contain valid JSON.",
                400,
            ),
            success: false,
        };
    }

    const result = schema.safeParse(payload);

    if (!result.success) {
        const details = result.error.issues.map(({ code, message, path }) => ({ code, message, path }));

        return {
            response: toolError("VALIDATION_ERROR", "The request did not match the required input.", 400, details),
            success: false,
        };
    }

    return { data: result.data, success: true };
}
