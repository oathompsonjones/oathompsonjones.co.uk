"use client";
import { LogLevel } from "api/logs";
import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

/**
 * Handles any 500 errors.
 *
 * @returns {JSX.Element} An error page.
 */
export default function Error({ error, reset }: { readonly error: Error; readonly reset: () => void; }): JSX.Element {
    // Log the error.
    useEffect(() => void axios.post("/api/logs", {
        content: `${error.name}: ${error.message}\n${error.stack ?? ""}`,
        level: LogLevel.ERROR
    }), [error]);

    return (
        <>
            <Typography gutterBottom variant="h2">Error 500 - Internal server error</Typography>
            <Typography variant="subtitle1">
                I've got a bad feeling about this. Click <a onClick={reset}>here</a> to try again.
            </Typography>
        </>
    );
}
