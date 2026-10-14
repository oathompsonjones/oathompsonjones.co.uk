import { parseToolRequest, toolError, toolSuccess } from "tools/api-server";
import { colourToolRequestSchema, runColourTool } from "tools/colour-tool";
import type { NextResponse } from "next/server";

/** Calculates WCAG contrast and colour relationships for a hex sRGB colour. */
export async function POST(request: Request): Promise<NextResponse> {
    const parsed = await parseToolRequest(request, colourToolRequestSchema, { maxBytes: 1024 });

    if (!parsed.success)
        return parsed.response;

    try {
        return toolSuccess(runColourTool(parsed.data));
    } catch (error) {
        if (error instanceof Error && error.message.startsWith("Enter a hexadecimal colour"))
            return toolError("INVALID_COLOUR", error.message, 400);

        throw error;
    }
}
