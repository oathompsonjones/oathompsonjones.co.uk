"use client";

import type { ButtonBaseOwnProps, ButtonOwnProps, Theme } from "@mui/material";
import { Button } from "@mui/material";
import Link from "next/link";
import type { ReactNode } from "react";
import { useMediaQuery } from "@mui/material";

/**
 * Renders a MUI button with dynamic sizing.
 * @param props - The component properties.
 * @param props.children - The children to render.
 * @returns A MUI Button.
 */
export function DynamicButton({ children, ...props }: ButtonBaseOwnProps & ButtonOwnProps & {
    children: ReactNode;
}): ReactNode {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
    const buttonSize = isMobile ? "small" : "large";

    return (
        <Button LinkComponent={props.LinkComponent ?? Link} size={buttonSize} {...props}>
            {children}
        </Button>
    );
}
