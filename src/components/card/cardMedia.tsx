"use client";

import type { CardMediaProps } from "@mui/material";
import { CardMedia as MuiCardMedia } from "@mui/material";
import type { ReactNode } from "react";

/**
 * CardMedia component that serves as a container for media content such as images or videos.
 * @param props - The props for the CardMedia component.
 * @param props.sx - The sx prop for the CardMedia component to allow for custom styling.
 * @returns A ReactNode representing the CardMedia component.
 * @see https://mui.com/material-ui/react-card/#complex-interaction for more details on the CardMedia component.
 */
export function CardMedia({ sx, ...props }: CardMediaProps): ReactNode {
    return (
        <MuiCardMedia
            sx={{
                m: "-1rem -1rem 0",
                width: "calc(100% + 2rem)",
                ...sx,
            }} {...props}
        />
    );
}
