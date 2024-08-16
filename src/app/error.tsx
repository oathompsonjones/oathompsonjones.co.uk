"use client";

import type { ReactElement } from "react";
import { Typography } from "@mui/material";

/**
 * Handles any 500 errors.
 *
 * @returns An error page.
 */
export default function Error({ error, reset }: { readonly error: Error; readonly reset: () => void; }): ReactElement {
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
