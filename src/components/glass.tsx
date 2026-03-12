"use client";

import { Paper } from "@mui/material";
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
    children: ReactNode;
    disabled?: boolean;
}): ReactNode {
    const className = useGlass(disabled);

    return (
        <Paper className={className} {...props}>
            {children}
        </Paper>
    );
}
