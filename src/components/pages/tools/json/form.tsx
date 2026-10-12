"use client";

import { Button, Stack } from "@mui/material";
import type { FormEvent, ReactNode } from "react";
import { ToolApiError, requestToolApi } from "tools/api";
import { useCallback, useRef, useState } from "react";
import { Glass } from "components/glass";
import type { JsonToolResult } from "tools/json-toolkit";
import { JsonToolkitInput } from "./input";
import { JsonToolkitOptions } from "./options";
import { JsonToolkitOutput } from "./output";
import { RestartAlt } from "@mui/icons-material";
import { jsonToolResultSchema } from "tools/json-toolkit";

type Operation = "convert" | "format" | "validate";

type FormatMode = "minify" | "pretty";

type ConversionTarget = "csv" | "json" | "schema" | "typescript" | "xml" | "yaml";

const initialJson = `{
  "name": "Ada Lovelace",
  "active": true,
  "roles": ["author", "mathematician"],
  "profile": {
    "born": 1815,
    "website": null
  }
}`;

/**
 * Creates the suggested output filename for the selected operation.
 * @param operation - The requested operation.
 * @param mode - The selected JSON formatting mode.
 * @param target - The selected conversion target.
 * @returns A filename with an appropriate extension.
 */
function getDownloadFilename(operation: Operation, mode: FormatMode, target: ConversionTarget): string {
    if (operation === "convert" && target === "typescript")
        return "converted.ts";

    if (operation === "convert" && target === "schema")
        return "converted.schema.json";

    if (operation === "convert")
        return `converted.${target}`;

    return `formatted.${mode === "minify" ? "min" : "pretty"}.json`;
}

/**
 * Selects syntax highlighting for the current output format.
 * @param operation - The requested operation.
 * @param target - The selected conversion target.
 * @returns A highlight.js language identifier.
 */
function getOutputLanguage(operation: Operation, target: ConversionTarget): string {
    if (operation === "validate")
        return "plaintext";

    if (operation === "format")
        return "json";

    if (target === "schema" || target === "json")
        return "json";

    return target === "typescript" ? "typescript" : target;
}

/**
 * Adds line and column information to structured JSON syntax errors.
 * @param error - The API failure.
 * @returns A readable error message.
 */
function getErrorMessage(error: unknown): string {
    if (error instanceof ToolApiError) {
        if (error.details === undefined || error.details === null || typeof error.details !== "object")
            return error.message;

        if (!("line" in error.details) || !("column" in error.details))
            return error.message;

        const { column, line } = error.details;

        if (
            typeof line === "number" &&
            typeof column === "number" &&
            !error.message.includes(`line ${line}, column ${column}`)
        )
            return `${error.message} (line ${line}, column ${column})`;

        return error.message;
    }

    if (error instanceof Error)
        return `Could not complete the request: ${error.message}`;

    return "An unexpected error prevented the operation from completing.";
}

/**
 * Manages the editor, options, and stateless JSON API request lifecycle.
 * @returns The JSON editor form, actions, and current output.
 */
export function JsonToolkitForm(): ReactNode {
    const [text, setText] = useState(initialJson);
    const [operation, setOperation] = useState<Operation>("format");
    const [mode, setMode] = useState<FormatMode>("pretty");
    const [target, setTarget] = useState<ConversionTarget>("json");
    const [indent, setIndent] = useState<"2" | "4">("2");
    const [sortKeys, setSortKeys] = useState(false);
    const [result, setResult] = useState<JsonToolResult | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [fileMessage, setFileMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const requestId = useRef(0);

    const invalidateResult = useCallback((): void => {
        requestId.current += 1;
        setResult(null);
        setErrorMessage("");
    }, []);

    const handleTextChange = useCallback((value: string): void => {
        invalidateResult();
        setText(value);
    }, [invalidateResult]);

    const handleFileLoad = useCallback((value: string, filename: string): void => {
        handleTextChange(value);
        setFileMessage(`Loaded ${filename}.`);
    }, [handleTextChange]);

    const handleOperationChange = useCallback((value: Operation): void => {
        invalidateResult();
        setOperation(value);
    }, [invalidateResult]);

    const handleModeChange = useCallback((value: FormatMode): void => {
        invalidateResult();
        setMode(value);
    }, [invalidateResult]);

    const handleTargetChange = useCallback((value: ConversionTarget): void => {
        invalidateResult();
        setTarget(value);
    }, [invalidateResult]);

    const handleIndentChange = useCallback((value: "2" | "4"): void => {
        invalidateResult();
        setIndent(value);
    }, [invalidateResult]);

    const handleSortKeysChange = useCallback((value: boolean): void => {
        invalidateResult();
        setSortKeys(value);
    }, [invalidateResult]);

    const reset = useCallback((): void => {
        requestId.current += 1;
        setText("");
        setOperation("format");
        setMode("pretty");
        setTarget("json");
        setIndent("2");
        setSortKeys(false);
        setResult(null);
        setErrorMessage("");
        setFileMessage("");
        setLoading(false);
    }, []);

    const runOperation = useCallback((event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        requestId.current += 1;
        const currentRequestId = requestId.current;

        setLoading(true);
        setResult(null);
        setErrorMessage("");

        requestToolApi(
            "/api/tools/json",
            {
                indent: indent === "4" ? 4 : 2,
                mode,
                operation,
                sortKeys,
                target,
                text,
            },
            jsonToolResultSchema,
        ).then(
            (data) => {
                if (requestId.current === currentRequestId)
                    setResult(data);
            },
            (error: unknown) => {
                if (requestId.current === currentRequestId)
                    setErrorMessage(getErrorMessage(error));
            },
        ).finally(() => {
            if (requestId.current === currentRequestId)
                setLoading(false);
        });
    }, [indent, mode, operation, sortKeys, target, text]);

    return (
        <Stack spacing={3}>
            <form onSubmit={runOperation}>
                <Glass sx={{ p: 2 }}>
                    <Stack spacing={3}>
                        <JsonToolkitInput
                            fileMessage={fileMessage}
                            onFileLoad={handleFileLoad}
                            onFileMessage={setFileMessage}
                            onTextChange={handleTextChange}
                            text={text}
                        />
                        <JsonToolkitOptions
                            indent={indent}
                            mode={mode}
                            onIndentChange={handleIndentChange}
                            onModeChange={handleModeChange}
                            onOperationChange={handleOperationChange}
                            onSortKeysChange={handleSortKeysChange}
                            onTargetChange={handleTargetChange}
                            operation={operation}
                            sortKeys={sortKeys}
                            target={target}
                        />
                        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                            <Button disabled={loading} type="submit" variant="contained">
                                {loading ? "Working…" : "Run"}
                            </Button>
                            <Button onClick={reset} startIcon={<RestartAlt />} variant="outlined">
                                Reset
                            </Button>
                        </Stack>
                    </Stack>
                </Glass>
            </form>
            <JsonToolkitOutput
                downloadFilename={getDownloadFilename(operation, mode, target)}
                errorMessage={errorMessage}
                language={getOutputLanguage(operation, target)}
                result={result}
            />
        </Stack>
    );
}
