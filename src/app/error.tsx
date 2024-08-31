"use client";

import type { ReactNode } from "react";
import { Typography } from "@mui/material";

/**
 * Handles any 500 errors.
 * @param props - The properties of the component.
 * @param props.error - The error that occurred.
 * @param props.reset - The function to reset the application.
 * @returns An error page.
 */
export default function Error({ error, reset }: { error: Error; reset: () => void; }): ReactNode {
    return (
        <>
            <Typography gutterBottom variant="h2">Error 500 - Internal server error</Typography>
            <Typography variant="subtitle1">
                I've got a bad feeling about this. Click <a onClick={reset}>here</a> to try again.
            </Typography>
            <Typography variant="caption">
                {error.message}
            </Typography>
        </>
    );
}
