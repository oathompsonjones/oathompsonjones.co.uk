import { Typography } from "@mui/material";

/**
 * A wrapper to build the page and error.
 *
 * @returns A page wrapper.
 */
export default function Layout({ children }: { readonly children: React.ReactElement; }): React.ReactElement {
    return (
        <>
            <Typography variant="h2">Gallery</Typography>
            {children}
        </>
    );
}
