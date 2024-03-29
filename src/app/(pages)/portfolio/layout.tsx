import type { ReactElement } from "react";
import { Typography } from "@mui/material";

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
