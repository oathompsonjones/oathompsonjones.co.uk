import type { Metadata } from "next";
import type { ReactElement } from "react";
import { Typography } from "@mui/material";

export const metadata: Metadata = { title: "Oliver Jones | Portfolio" };

/**
 * A wrapper to build the page and error.
 * @returns A page wrapper.
 */
export default function Layout({ children }: { readonly children: ReactElement; }): ReactElement {
    return (
        <>
            <Typography variant="h2">Portfolio</Typography>
            {children}
        </>
    );
}
