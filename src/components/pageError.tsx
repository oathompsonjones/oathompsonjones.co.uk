"use client";

import { Button, Typography } from "@mui/material";
import type { ReactElement } from "react";

/**
 * Handles errors for the page.
 * @param props - The component properties.
 * @param props.error - The error that occurred.
 * @param props.reset - The function to reset the application.
 * @returns An error element.
 */
export function PageError({ error, reset }: { error: Error; reset: () => void; }): ReactElement {
    return (
        <>
            <Typography variant="h4">An error occurred, please try again later.</Typography>
            <Typography>{error.message}</Typography>
            <Button onClick={reset} size="small">Try Again</Button>
        </>
    );
}
