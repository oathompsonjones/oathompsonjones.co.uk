import Link from "next/link";
import type { ReactElement } from "react";
import { Typography } from "@mui/material";

/**
 * Creates the header element.
 * @returns The page header.
 */
export default function Title({ textColour }: { readonly textColour: string; }): ReactElement {
    return (
        <Typography
            align="center"
            color={textColour}
            component={Link}
            href="/"
            sx={{
                flexGrow: { md: 0, xs: 1 }, 
                fontFamily: "monospace", 
                fontWeight: 700, 
                letterSpacing: ".3rem",
            }}
            variant="h5"
        >
            OATHOMPSONJONES
        </Typography>
    );
}
