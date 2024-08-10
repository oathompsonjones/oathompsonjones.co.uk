import { Box } from "@mui/material";
import type { ReactElement } from "react";

/**
 * Renders its children on mobile only.
 * @returns A div.
 */
export default function Mobile({ children }: { readonly children?: ReactElement | ReactElement[]; }): ReactElement {
    return (
        <Box sx={{ display: { md: "none" } }}>
            {children}
        </Box>
    );
}
