import { Typography } from "@mui/material";

/**
 * A wrapper to build the page and error.
 *
 * @returns {React.ReactNode} A page wrapper.
 */
export default function Layout({ children }: { readonly children: React.ReactNode; }): React.ReactNode {
    return (
        <>
            <Typography variant="h2">Gallery</Typography>
            {children}
        </>
    );
}
