"use client";
import { Typography } from "@mui/material";
import { useEffect } from "react";

/**
 * Handles any 500 errors.
 *
 * @returns {JSX.Element} An error page.
 */
export default function Error({ error, reset }: { error: Error; reset: () => void; }): JSX.Element {
    // Log the error.
    useEffect(() => console.error(error), [error]);

    return (
        <>
            <Typography gutterBottom variant="h2">Error 500 - Internal server error</Typography>
            <Typography variant="subtitle1">
                I've got a bad feeling about this. Click <a onClick={reset}>here</a> to try again.
            </Typography>
            {/* <Button onClick={reset} size="large" variant="contained">Try Again</Button> */}
        </>
    );
}
