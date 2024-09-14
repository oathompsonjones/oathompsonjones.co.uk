import type { DOMAttributes, ReactNode } from "react";
import { Paper } from "@mui/material";

/**
 * A wrapper for code blocks.
 * @param props - An object containing the component props.
 * @param props.children - The children to render.
 * @param props.props - The props to pass to the Paper component.
 * @returns The wrapped children.
 */
export function CodeWrapper({ children, ...props }: DOMAttributes<HTMLDivElement>): ReactNode {
    return (
        <Paper
            sx={{
                border: "3px solid gray",
                overflow: "hidden",
                position: "relative",
                textAlign: "left",
            }}
            {...props}
        >
            {children}
        </Paper>
    );
}
