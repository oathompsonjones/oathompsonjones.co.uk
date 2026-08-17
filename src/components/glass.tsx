"use client";

import { AccessibilityContext } from "contexts/accessibility";
import { Paper } from "@mui/material";
import { useContext } from "react";
import type { PaperProps } from "@mui/material";
import type { ReactNode } from "react";
import { useGlass } from "hooks/useGlass";

/**
 * A Glass effect component.
 * @param props - The props for the Glass component.
 * @param props.children - The children to render within the Glass component.
 * @param props.disabled - Whether the glass effect is disabled. Defaults to false.
 * When true, the component will render with a transparent background and no blur effect.
 * @param props.sx - Additional styles to apply to the Paper component.
 * @returns The Glass component with the children rendered inside.
 */
export function Glass({ children, disabled = false, ...props }: PaperProps & {
    children?: ReactNode;
    disabled?: boolean;
}): ReactNode {
    const { reduceTransparency } = useContext(AccessibilityContext);
    const className = useGlass(disabled);
    const glassEnabled = !disabled && !reduceTransparency;
    const { sx, style, ...paperProps } = props;

    return (
        <Paper
            {...paperProps}
            className={className}
            sx={sx}
            style={{
                backgroundColor: glassEnabled ? "rgba(255, 255, 255, 0.05)" : undefined,
                backdropFilter: glassEnabled ? "blur(5px) saturate(180%)" : "none",
                WebkitBackdropFilter: glassEnabled ? "blur(5px) saturate(180%)" : "none",
                isolation: glassEnabled ? "isolate" : "auto",
                overflow: glassEnabled ? "hidden" : "visible",
                position: glassEnabled ? "relative" : "static",
                ...style,
            }}
        >
            {children}
        </Paper>
    );
}
