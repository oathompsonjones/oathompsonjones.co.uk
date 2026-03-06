"use client";

import { Paper } from "@mui/material";
import type { ReactNode } from "react";
import type { SxProps } from "@mui/material";
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
export function Glass({ children, disabled = false, sx }: {
    children: ReactNode;
    disabled?: boolean;
    sx?: SxProps;
}): ReactNode {
    const className = useGlass(disabled);

    return (
        <Paper sx={sx ?? {}} className={className}>
            {children}
        </Paper>
    );
}
