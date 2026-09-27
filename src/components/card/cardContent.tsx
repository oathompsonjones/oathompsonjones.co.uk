"use client";

import type { CardContentOwnProps } from "@mui/material";
import { CardContent as MuiCardContent } from "@mui/material";
import type { ReactNode } from "react";

/**
 * CardContent component that serves as a container for the main content of the card.
 * @param props - The props for the CardContent component.
 * @param props.sx - The sx prop for the CardContent component to allow for custom styling.
 * @param props.children - The content of the CardContent component.
 * @returns A ReactNode representing the CardContent component.
 * @see https://mui.com/material-ui/react-card/#complex-interaction for more details on the CardContent component.
 */
export function CardContent({ children, sx, ...props }: CardContentOwnProps): ReactNode {
    return (
        <MuiCardContent sx={{ mb: "-1rem", ...sx }} {...props}>
            {children}
        </MuiCardContent>
    );
}
