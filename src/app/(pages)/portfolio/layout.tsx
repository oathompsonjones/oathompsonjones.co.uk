import type { ReactElement, ReactNode } from "react";
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
            <Typography variant="h2">Portfolio</Typography>
            {children}
        </>
    );
}
