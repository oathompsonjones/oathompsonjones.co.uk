import Typography from "@mui/material/Typography";

/**
 * A wrapper to build the page and error.
 *
 * @returns {JSX.Element} A page wrapper.
 */
export default function Layout({ children }: { children: React.ReactNode; }): JSX.Element {
    return (
        <>
            <Typography variant="h2">Gallery</Typography>
            {children}
        </>
    );
}
