import { Box } from "@mui/material";
import type { ReactElement } from "react";

/**
 * A div which will be used to either fade in or out.
 * @param children - The children.
 * @returns A div.
 */
export function FadingDiv({ children }: {
    readonly children?: ReactElement | ReactElement[];
}): ReactElement {
    return (
        <Box
            className="fadingDiv"
            sx={{
                alignItems: "center",
                display: "flex",
                filter: { md: "opacity(0%)" },
                flexDirection: "column",
                height: "100%",
                justifyContent: "center",
                left: 0,
                overflow: "hidden",
                padding: { md: "5rem 3rem 1rem" },
                pointerEvents: "none",
                position: { md: "fixed" },
                top: 0,
                transition: "filter 0.25s linear",
            }}>
            {children}
        </Box>
    );
}
