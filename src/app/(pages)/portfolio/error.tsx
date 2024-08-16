"use client";

import { Button, Typography } from "@mui/material";
import type { ReactElement } from "react";

/**
 * Handles errors for the page.
 *
 * @returns An error element.
 */
export default function Error({ error, reset }: { readonly error: Error; readonly reset: () => void; }): ReactElement {
    return (
        <>
            <Typography color="secondary" variant="h4">An error occurred, please try again later.</Typography>
            <Typography variant="caption">
                {error.message}
            </Typography>
            <Button onClick={reset} size="large">Try Again</Button>
        </>
    );
}
