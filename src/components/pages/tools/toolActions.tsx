"use client";

import { Button, Stack, Typography } from "@mui/material";
import { ContentCopy, Download, RestartAlt } from "@mui/icons-material";
import { useCallback, useState } from "react";
import type { ReactNode } from "react";

type ToolActionsProps = {
    readonly downloadFilename?: string;
    readonly onReset?: () => void;
    readonly output: string;
};

/**
 * Supplies consistent reset, copy, and download actions for tool output.
 * @param props - The available actions and output.
 * @param props.downloadFilename - The suggested name for a downloaded output file.
 * @param props.onReset - Optional callback that clears the tool's current state.
 * @param props.output - The text to copy or download.
 * @returns Tool action buttons and an accessible status message.
 */
export function ToolActions({
    downloadFilename = "tool-output.txt",
    onReset,
    output,
}: ToolActionsProps): ReactNode {
    const [status, setStatus] = useState("");

    const handleCopy = useCallback((): void => {
        navigator.clipboard.writeText(output).then(
            () => setStatus("Output copied to clipboard."),
            () => setStatus("Could not copy output. Check clipboard permissions and try again."),
        );
    }, [output]);

    const handleDownload = useCallback((): void => {
        const filename = downloadFilename
            .replaceAll(/[\\/:*?"<>|]/g, "-")
            .replaceAll(/\p{Cc}/gu, "-")
            .replaceAll(/^\.+|\.+$/g, "")
            .trim() || "tool-output.txt";
        const url = URL.createObjectURL(new Blob([output], { type: "text/plain;charset=utf-8" }));
        const anchor = document.createElement("a");

        anchor.href = url;
        anchor.download = filename;
        anchor.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 0);
    }, [downloadFilename, output]);

    const handleReset = useCallback((): void => {
        onReset?.();
        setStatus("");
    }, [onReset]);

    return (
        <Stack spacing={1} sx={{ alignItems: "flex-start" }}>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                {onReset !== undefined && (
                    <Button onClick={handleReset} startIcon={<RestartAlt />} variant="outlined">
                        Reset
                    </Button>
                )}
                <Button
                    disabled={output.length === 0}
                    onClick={handleCopy}
                    startIcon={<ContentCopy />}
                    variant="outlined"
                >
                    Copy
                </Button>
                <Button
                    disabled={output.length === 0}
                    onClick={handleDownload}
                    startIcon={<Download />}
                    variant="outlined"
                >
                    Download
                </Button>
            </Stack>
            <Typography aria-live="polite" role="status" variant="body2">
                {status || " "}
            </Typography>
        </Stack>
    );
}
