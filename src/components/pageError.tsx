"use client";

import type { ReactNode } from "react";
import { Typography } from "@mui/material";

/**
 * Handles errors for the page.
 * @param props - The component properties.
 * @param props.error - The error that occurred.
 * @param props.reset - The function to reset the application.
 * @returns An error element.
 */
export function PageError({ error, reset }: { readonly error: Error; readonly reset: () => void; }): ReactNode {
    return (
        <div>
            <Typography color="text.secondary" variant="h4">
                An error occurred, please <a onClick={reset}>try again</a> later.
            </Typography>
            <Typography>{error.message}</Typography>
        </div>
    );
}
