import { expect, describe, it } from "vitest";
import { POST } from "./route";

async function postJson(payload: unknown): Promise<Response> {
    return POST(new Request("http://localhost/api/tools/colour", {
        body: JSON.stringify(payload),
        headers: new Headers([["Content-Type", "application/json"]]),
        method: "POST",
    }));
}

describe("POST /api/tools/colour", () => {
    it("returns WCAG contrast and palette data", async () => {
        const response = await postJson({ colour: "#FFFFFF" });
        const payload: unknown = await response.json();

        expect(response.status).toBe(200);
        expect(response.headers.get("Cache-Control")).toBe("no-store");
        expect(payload).toMatchObject({
            data: {
                colour: "#FFFFFF",
                contrast: {
                    black: 21,
                    blackMeetsAA: true,
                    recommended: "black",
                    white: 1,
                    whiteMeetsAA: false,
                },
                palette: expect.arrayContaining([
                    { hex: "#FFFFFF", label: "Base" },
                ]),
            },
            success: true,
        });
    });

    it("rejects invalid colours", async () => {
        const response = await postJson({ colour: "chartreuse please" });
        const payload: unknown = await response.json();

        expect(response.status).toBe(400);
        expect(payload).toMatchObject({
            error: { code: "INVALID_COLOUR" },
            success: false,
        });
    });

    it("validates the request shape", async () => {
        const response = await postJson({ notColour: true });

        expect(response.status).toBe(400);
    });
});
