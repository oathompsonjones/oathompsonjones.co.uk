import {
    HASH_TOOL_MAX_REQUEST_BYTES,
    hashEncodingRequestSchema,
    runHashEncodingTool,
} from "tools/hash-encoding/hash-encoding-toolkit";
import { parseToolRequest, toolError, toolSuccess } from "tools/api-server";
import type { NextResponse } from "next/server";

/**
 * Processes stateless encoding, decoding, and hashing requests.
 * @param request - The incoming toolkit request.
 * @returns A result or structured error response.
 */
export async function POST(request: Request): Promise<NextResponse> {
    const parsed = await parseToolRequest(
        request,
        hashEncodingRequestSchema,
        { maxBytes: HASH_TOOL_MAX_REQUEST_BYTES },
    );

    if (!parsed.success)
        return parsed.response;

    const result = runHashEncodingTool(parsed.data);

    if (!result.success)
        return toolError(result.error.code, result.error.message, result.status);

    return toolSuccess(result.data);
}
