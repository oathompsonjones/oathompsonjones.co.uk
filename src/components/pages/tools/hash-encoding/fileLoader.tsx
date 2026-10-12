"use client";

import { Button, Stack, Typography } from "@mui/material";
import { type ChangeEvent, type ReactNode, useCallback, useRef, useState } from "react";
import { HASH_ENCODING_MAX_INPUT_LENGTH } from "tools/hash-encoding-toolkit";

type FileLoaderProps = {
    readonly onLoad: (text: string) => void;
};

/**
 * Loads a UTF-8 text file into the input without uploading it anywhere.
 * @param props - The component props.
 * @param props.onLoad - Receives the file contents.
 * @returns A file picker button with accessible status feedback.
 */
export function FileLoader({ onLoad }: FileLoaderProps): ReactNode {
    const input = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState("");

    const openPicker = useCallback((): void => {
        input.current?.click();
    }, []);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        const file = event.currentTarget.files?.[0];

        event.currentTarget.value = "";

        if (file === undefined)
            return;

        if (file.size > HASH_ENCODING_MAX_INPUT_LENGTH) {
            setMessage(`Choose a file smaller than ${HASH_ENCODING_MAX_INPUT_LENGTH.toLocaleString()} bytes.`);

            return;
        }

        file.text().then(
            (contents) => {
                onLoad(contents);
                setMessage(`Loaded ${file.name}.`);
            },
            () => {
                setMessage("Could not read this file.");
            },
        );
    }, [onLoad]);

    return (
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
            <Button onClick={openPicker} variant="outlined">Load text file</Button>
            <input hidden onChange={handleChange} ref={input} type="file" />
            <Typography aria-live="polite" role="status" variant="body2">{message || " "}</Typography>
        </Stack>
    );
}
