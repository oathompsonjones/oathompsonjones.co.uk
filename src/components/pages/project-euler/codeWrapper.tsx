import type { DOMAttributes, ReactNode } from "react";
import { Paper } from "@mui/material";
import type { SxProps } from "@mui/material";

/**
 * A wrapper for code blocks.
 * @param props - An object containing the component props.
 * @param props.children - The children to render.
 * @param props.props - The props to pass to the Paper component.
 * @param props.sx - Optional styles to apply to the Paper component.
 * @returns The wrapped children.
 */
export function CodeWrapper({ children, sx, ...props }: DOMAttributes<HTMLDivElement> & { sx?: SxProps; }): ReactNode {
    return (
        <Paper
            sx={{
                border: "3px solid gray",
                overflow: "hidden",
                position: "relative",
                textAlign: "left",
                ...sx,
            }}
            {...props}
        >
            {children}
        </Paper>
    );
}
