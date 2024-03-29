"use client";

import Logger from "logger";
import type { ReactElement } from "react";
import { Typography } from "@mui/material";
import { useEffect } from "react";

/**
 * Handles any 500 errors.
 *
 * @returns An error page.
 */
export default function Error({ error, reset }: { readonly error: Error; readonly reset: () => void; }): ReactElement {
    // Log the error.
    useEffect(() => {
        void Logger.error(`${error.name}: ${error.message}\n${error.stack ?? ""}`);
    }, [error]);

    return (
        <>
            <Typography gutterBottom variant="h2">Error 500 - Internal server error</Typography>
            <Typography variant="subtitle1">
                I've got a bad feeling about this. Click <a onClick={reset}>here</a> to try again.
            </Typography>
        </>
    );
}
