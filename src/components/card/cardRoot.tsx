"use client";

import type { CardProps } from "@mui/material";
import { Card as MuiCard } from "@mui/material";
import type { ReactNode } from "react";
import { useGlass } from "hooks/useGlass";

/**
 * Card component that serves as a container for content and actions.
 * @param props - The props for the Card component.
 * @param props.children - The content of the Card component.
 * @returns A ReactNode representing the Card component.
 * @see https://mui.com/material-ui/react-card/ for more details on the Card component.
 */
export function CardRoot({ children, ...props }: CardProps): ReactNode {
    const className = useGlass();

    return (
        <MuiCard className={className} {...props}>
            {children}
        </MuiCard>
    );
}
