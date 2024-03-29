"use client";

import { Button, Typography } from "@mui/material";
import Logger from "logger";
import type { ReactElement } from "react";
import { useEffect } from "react";

/**
 * Handles errors for the page.
 *
 * @returns An error element.
 */
export default function Error({ error, reset }: { readonly error: Error; readonly reset: () => void; }): ReactElement {
    // Log the error.
    useEffect(() => {
        void Logger.error(`Gallery ${error.name}: ${error.message}\n${error.stack ?? ""}`);
    }, [error]);

    return (
        <>
            <Typography variant="h4">An error occurred, please try again later.</Typography>
            <Button onClick={reset} size="large">Try Again</Button>
        </>
    );
}
