"use client";
import { CircularProgress, Stack } from "@mui/material";

/**
 * Handles loading for the page.
 *
 * @returns {JSX.Element} A loading element.
 */
export default function Loading(): JSX.Element {
    return (
        <Stack alignItems="center" justifyContent="center">
            <CircularProgress />
        </Stack>
    );
}

