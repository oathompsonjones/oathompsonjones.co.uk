import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Typography } from "@mui/material";

export const metadata: Metadata = { title: "Oliver Jones | Page Not Found" };

/**
 * Handles any 404 errors.
 * @returns An error page.
 */
export default function Error(): ReactNode {
    return (
        <>
            <Typography gutterBottom variant="h2">Error 404 - Page not found</Typography>
            <Typography variant="subtitle1">
                These aren't the droids you're looking for. Click <Link href="/">here</Link> to go to the homepage.
            </Typography>
        </>
    );
}
