"use client";

import type { CardActionsProps } from "@mui/material";
import { CardActions as MuiCardActions } from "@mui/material";
import type { ReactNode } from "react";

/**
 * CardActions component that serves as a container for the actions of the card.
 * @param props - The props for the CardActions component.
 * @param props.children - The content of the CardActions component.
 * @returns A ReactNode representing the CardActions component.
 * @see https://mui.com/material-ui/react-card/#complex-interaction for more details on the CardActions component.
 */
export function CardActions({ children, ...props }: CardActionsProps): ReactNode {
    return (
        <MuiCardActions {...props}>
            {children}
        </MuiCardActions>
    );
}
