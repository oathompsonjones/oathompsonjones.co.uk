import { JSON_TOOL_MAX_REQUEST_BYTES, jsonToolRequestSchema, runJsonTool } from "tools/json-toolkit";
import { parseToolRequest, toolError, toolSuccess } from "tools/api-server";
import type { NextResponse } from "next/server";

/**
 * Processes JSON formatting, validation, and conversion requests.
 * @param request - The incoming JSON tool request.
 * @returns A stateless JSON result or a structured error.
 */
export async function POST(request: Request): Promise<NextResponse> {
    const parsed = await parseToolRequest(request, jsonToolRequestSchema, { maxBytes: JSON_TOOL_MAX_REQUEST_BYTES });

    if (!parsed.success)
        return parsed.response;

    const result = runJsonTool(parsed.data);

    if (!result.success) {
        return toolError(
            result.error.code,
            result.error.message,
            result.status,
            result.details,
        );
    }

    return toolSuccess(result.data);
}
