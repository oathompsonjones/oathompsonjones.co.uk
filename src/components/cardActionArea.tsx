"use client";

import type { CardActionAreaProps } from "@mui/material";
import { CardActionArea as MuiCardActionArea } from "@mui/material";
import type { ReactNode } from "react";

/**
 * CardActionArea component that serves as a container for the action area of the card.
 * @param props - The props for the CardActionArea component.
 * @param props.children - The content of the CardActionArea component.
 * @param props.sx - The sx prop for the CardActionArea component to allow for custom styling.
 * @returns A ReactNode representing the CardActionArea component.
 * @see https://mui.com/material-ui/react-card/#complex-interaction for more details on the CardActionArea component.
 */
export function CardActionArea({ children, sx, ...props }: CardActionAreaProps): ReactNode {
    return (
        <MuiCardActionArea
            sx={{
                m: "-1rem -1rem 0",
                width: "calc(100% + 2rem)",
                ...sx,
            }} {...props}
        >
            {children}
        </MuiCardActionArea>
    );
}
