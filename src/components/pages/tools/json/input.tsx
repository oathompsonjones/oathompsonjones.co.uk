"use client";

import { Button, Stack, TextField, Typography } from "@mui/material";
import type { ChangeEvent, ReactNode } from "react";
import { useCallback, useId, useRef } from "react";
import { JSON_TOOL_MAX_INPUT_LENGTH } from "tools/json-toolkit";
import { ToolSection } from "components/pages/tools/toolSection";

type JsonToolkitInputProps = {
    readonly fileMessage: string;
    readonly onFileLoad: (text: string, filename: string) => void;
    readonly onFileMessage: (message: string) => void;
    readonly onTextChange: (text: string) => void;
    readonly text: string;
};

/**
 * Provides a labelled JSON editor and optional JSON file upload.
 * @param props - The editor value and callbacks.
 * @param props.fileMessage - Accessible feedback for the last file operation.
 * @param props.onFileLoad - Receives successfully loaded file contents.
 * @param props.onFileMessage - Sets accessible file operation feedback.
 * @param props.onTextChange - Updates the source JSON.
 * @param props.text - The current JSON input.
 * @returns The JSON input section.
 */
export function JsonToolkitInput({
    fileMessage,
    onFileLoad,
    onFileMessage,
    onTextChange,
    text,
}: JsonToolkitInputProps): ReactNode {
    const fileInputId = useId();
    const fileInput = useRef<HTMLInputElement>(null);

    const handleTextChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        onTextChange(event.target.value);
    }, [onTextChange]);

    const loadFile = useCallback((file: File | undefined): void => {
        if (file === undefined)
            return;

        if (file.size > JSON_TOOL_MAX_INPUT_LENGTH) {
            onFileMessage(`Choose a JSON file smaller than ${JSON_TOOL_MAX_INPUT_LENGTH.toLocaleString()} bytes.`);

            return;
        }

        file.text().then(
            (contents) => {
                onFileLoad(contents, file.name);
                onFileMessage(`Loaded ${file.name}.`);
            },
            (error: unknown) => {
                const message = error instanceof Error
                    ? `Could not read file: ${error.message}`
                    : "Could not read this file.";

                onFileMessage(message);
            },
        );
    }, [onFileLoad, onFileMessage]);

    const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        loadFile(event.currentTarget.files?.[0]);
        event.currentTarget.value = "";
    }, [loadFile]);

    const openFilePicker = useCallback((): void => {
        fileInput.current?.click();
    }, []);

    return (
        <ToolSection glass={false} title="Input">
            <TextField
                fullWidth
                helperText={
                    `${text.length.toLocaleString()} / ${JSON_TOOL_MAX_INPUT_LENGTH.toLocaleString()} characters`
                }
                label="JSON input"
                minRows={12}
                multiline
                onChange={handleTextChange}
                slotProps={{ htmlInput: { maxLength: JSON_TOOL_MAX_INPUT_LENGTH, spellCheck: false } }}
                value={text}
            />
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
                <Button onClick={openFilePicker} variant="outlined">
                    Load JSON file
                </Button>
                <input
                    accept=".json,application/json,text/json"
                    hidden
                    id={fileInputId}
                    onChange={handleFileChange}
                    ref={fileInput}
                    type="file"
                />
                <Typography aria-live="polite" role="status" variant="body2">
                    {fileMessage || " "}
                </Typography>
            </Stack>
        </ToolSection>
    );
}
