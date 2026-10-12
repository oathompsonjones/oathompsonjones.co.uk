"use client";

import { Alert, Button, Stack, TextField } from "@mui/material";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import {
    DEFAULT_OPTIONS,
    HashEncodingOptions,
    type ToolOptions,
    buildRequest,
    getDownloadFilename,
} from "./options";
import { HASH_ENCODING_MAX_INPUT_LENGTH, hashEncodingResultSchema } from "tools/hash-encoding-toolkit";
import { ToolApiError, requestToolApi } from "tools/api";
import { useCallback, useRef, useState } from "react";
import { Code } from "components/code";
import { FileLoader } from "./fileLoader";
import { OperationNotices } from "./notices";
import { ToolSection } from "components/pages/tools";

/**
 * Converts API and network failures to text suitable for the error alert.
 * @param error - The caught failure.
 * @returns A safe, readable error message.
 */
function getRequestErrorMessage(error: unknown): string {
    if (error instanceof ToolApiError)
        return error.message;

    if (error instanceof Error)
        return `Could not complete the request: ${error.message}`;

    return "An unexpected error prevented the operation from completing.";
}

/**
 * Provides API-backed encoding, encryption, hashing, and signing controls.
 * @returns A tool form with text input and generated output.
 */
export function HashEncodingForm(): ReactNode {
    const [text, setText] = useState("");
    const [options, setOptions] = useState<ToolOptions>(DEFAULT_OPTIONS);
    const [output, setOutput] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const requestId = useRef(0);

    const invalidateResult = useCallback((): void => {
        requestId.current += 1;
        setOutput(null);
        setErrorMessage("");
        setLoading(false);
    }, []);

    const reset = useCallback((): void => {
        requestId.current += 1;
        setText("");
        setOptions(DEFAULT_OPTIONS);
        setOutput(null);
        setErrorMessage("");
        setLoading(false);
    }, []);

    const handleOptionsChange = useCallback((changes: Partial<ToolOptions>): void => {
        invalidateResult();
        setOptions((previous) => ({ ...previous, ...changes }));
    }, [invalidateResult]);

    const handleTextChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        invalidateResult();
        setText(event.target.value);
    }, [invalidateResult]);

    const handleFileLoad = useCallback((contents: string): void => {
        invalidateResult();
        setText(contents);
    }, [invalidateResult]);

    const runOperation = useCallback((event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        requestId.current += 1;
        const currentRequestId = requestId.current;

        setLoading(true);
        setOutput(null);
        setErrorMessage("");

        const input = buildRequest(options, text);

        requestToolApi(
            "/api/tools/hash-encoding",
            input,
            hashEncodingResultSchema,
        ).then(
            (result) => {
                if (requestId.current === currentRequestId)
                    setOutput(result.output);
            },
            (error: unknown) => {
                if (requestId.current === currentRequestId)
                    setErrorMessage(getRequestErrorMessage(error));
            },
        ).finally(() => {
            if (requestId.current === currentRequestId)
                setLoading(false);
        });
    }, [options, text]);

    return (
        <Stack spacing={3}>
            <form onSubmit={runOperation}>
                <ToolSection title="Input and operation">
                    <Stack spacing={2}>
                        <HashEncodingOptions onChange={handleOptionsChange} options={options} />
                        <TextField
                            fullWidth
                            label="Text (UTF-8)"
                            minRows={6}
                            multiline
                            onChange={handleTextChange}
                            slotProps={{ htmlInput: { maxLength: HASH_ENCODING_MAX_INPUT_LENGTH, spellCheck: false } }}
                            value={text}
                        />
                        <FileLoader onLoad={handleFileLoad} />
                        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                            <Button disabled={loading} type="submit" variant="contained">
                                {loading ? "Working…" : "Run"}
                            </Button>
                            <Button onClick={reset} variant="outlined">Reset</Button>
                        </Stack>
                    </Stack>
                </ToolSection>
            </form>
            {errorMessage !== "" && <Alert severity="error">{errorMessage}</Alert>}
            {output !== null && (
                <ToolSection title="Output">
                    <OperationNotices options={options} />
                    <Code
                        downloadFilename={getDownloadFilename(options)}
                        language="plaintext"
                        wrap
                    >
                        {output}
                    </Code>
                </ToolSection>
            )}
        </Stack>
    );
}
