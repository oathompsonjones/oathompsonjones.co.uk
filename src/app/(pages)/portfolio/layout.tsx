import type { ReactElement, ReactNode } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Typography } from "@mui/material";

export const metadata: Metadata = { title: "Oliver Jones | Portfolio" };

/**
 * A wrapper to build the page and error.
 * @param props - The properties of the component.
 * @param props.children - The children to render.
 * @returns A page wrapper.
 */
export default function Layout({ children }: { children: ReactNode; }): ReactElement {
    return (
        <>
            <Typography variant="h2" textAlign="center">Portfolio</Typography>
            {children}
            <Typography variant="subtitle1" textAlign="right">
                Visit my <Link href="/github" prefetch={false}>GitHub</Link> profile.
            </Typography>
        </>
    );
}
