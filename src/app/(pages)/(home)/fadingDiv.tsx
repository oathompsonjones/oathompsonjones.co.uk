"use client";

import { Box } from "@mui/material";
import type { ReactElement } from "react";

/**
 * A div which will be used to either fade in or out.
 * @param children - The children.
 * @returns A div.
 */
export default function FadingDiv({ children }: {
    readonly children?: ReactElement | ReactElement[];
}): ReactElement {
    return (
        <Box
            className="fadingDiv"
            sx={{
                alignItems: "center",
                flexDirection: "column",
                display: "flex",
                filter: { md: `opacity(0%)` },
                height: "100%",
                justifyContent: "center",
                overflow: "hidden",
                position: { md: "fixed" },
                top: 0,
                transition: "filter 0.25s linear",
            }}>
            {children}
        </Box>
    );
}
