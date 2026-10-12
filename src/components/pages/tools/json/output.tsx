import { Alert, Stack } from "@mui/material";
import { Code } from "components/code";
import type { JsonToolResult } from "tools/json-toolkit";
import type { ReactNode } from "react";
import { ToolSection } from "components/pages/tools/toolSection";

type JsonToolkitOutputProps = {
    readonly downloadFilename: string;
    readonly errorMessage: string;
    readonly language: string;
    readonly result: JsonToolResult | null;
};

/**
 * Displays JSON operation errors or results with copy and download actions.
 * @param props - The operation result and reset callback.
 * @param props.downloadFilename - The generated output filename.
 * @param props.errorMessage - An error to display, if any.
 * @param props.language - The syntax-highlighting language for the output.
 * @param props.result - The most recent successful result.
 * @returns The operation error and/or result.
 */
export function JsonToolkitOutput({
    downloadFilename,
    errorMessage,
    language,
    result,
}: JsonToolkitOutputProps): ReactNode {
    return (
        <Stack spacing={2}>
            {errorMessage.length > 0 && (
                <ToolSection title="Error">
                    <Alert severity="error">{errorMessage}</Alert>
                </ToolSection>
            )}
            {result !== null && (
                <ToolSection title="Output">
                    {result.notices.map((notice) => (
                        <Alert key={notice} severity="info">{notice}</Alert>
                    ))}
                    <Code downloadFilename={downloadFilename} language={language}>
                        {result.output}
                    </Code>
                </ToolSection>
            )}
        </Stack>
    );
}
