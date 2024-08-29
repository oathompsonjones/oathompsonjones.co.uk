import type { ReactElement } from "react";
import { Typography } from "@mui/material";

/**
 * Creates the header element.
 * @returns The page header.
 */
export function Title(): ReactElement {
    return (
        <Typography
            align="center"
            variant="h5"
            sx={{
                color: "inherit",
                flexGrow: { md: 0, xs: 1 },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
            }}
        >OATHOMPSONJONES</Typography>
    );
}
