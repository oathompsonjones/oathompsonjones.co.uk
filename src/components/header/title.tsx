import type { ReactElement } from "react";
import { Typography } from "@mui/material";

/**
 * Creates the header element.
 * @param props - The properties of the component.
 * @param props.textColour - The colour of the text in the header.
 * @returns The page header.
 */
export function Title({ textColour }: { textColour: string; }): ReactElement {
    return (
        <Typography
            align="center"
            color={textColour}
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
