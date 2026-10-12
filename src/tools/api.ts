import { z } from "zod";

export type ToolApiSuccess<T> = {
    data: T;
    success: true;
};

export type ToolApiFailure = {
    error: {
        code: string;
        details?: unknown;
        message: string;
    };
    success: false;
};

export class ToolApiError extends Error {
    public readonly code: string;

    public readonly status: number;

    public readonly details: unknown;

    public constructor({
        code,
        details,
        message,
        status,
    }: {
        code: string;
        details?: unknown;
        message: string;
        status: number;
    }) {
        super(message);
        this.name = "ToolApiError";
        this.code = code;
        this.status = status;
        this.details = details;
    }
}

const failureSchema = z.object({
    error: z.object({
        code: z.string(),
        details: z.unknown().optional(),
        message: z.string(),
    }),
    success: z.literal(false),
});

/**
 * Calls a stateless tool endpoint and validates its response envelope and data.
 * @template T - The expected operation result type.
 * @param endpoint - The API route to call.
 * @param input - The complete operation input.
 * @param outputSchema - The schema for the expected result.
 * @param options - Optional request cancellation signal.
 * @param options.signal - Optional cancellation signal for the request.
 * @returns The validated operation result.
 */
export async function requestToolApi<T>(
    endpoint: string,
    input: unknown,
    outputSchema: z.ZodType<T>,
    options: { signal?: AbortSignal; } = {},
): Promise<T> {
    const response = await fetch(endpoint, {
        body: JSON.stringify(input),
        cache: "no-store",
        headers: new Headers([["Content-Type", "application/json"]]),
        method: "POST",
        signal: options.signal ?? null,
    });

    let payload: unknown;

    try {
        payload = await response.json();
    } catch {
        throw new ToolApiError({
            code: "INVALID_RESPONSE",
            message: "The tool API returned an invalid response.",
            status: response.status,
        });
    }

    const failure = failureSchema.safeParse(payload);

    if (failure.success) {
        throw new ToolApiError({
            ...failure.data.error,
            status: response.status,
        });
    }

    if (!response.ok) {
        throw new ToolApiError({
            code: "REQUEST_FAILED",
            message: "The tool API request failed.",
            status: response.status,
        });
    }

    const success = z.object({
        data: outputSchema,
        success: z.literal(true),
    }).safeParse(payload);

    if (!success.success) {
        throw new ToolApiError({
            code: "INVALID_RESPONSE",
            details: success.error.issues,
            message: "The tool API response did not match the expected format.",
            status: response.status,
        });
    }

    return success.data.data;
}
