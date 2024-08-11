"use client";

import { Button, ButtonBaseOwnProps, ButtonOwnProps, Theme } from "@mui/material";
import Link from "next/link";
import type { ReactElement, ReactNode } from "react";
import { useMediaQuery } from "@mui/material";

/**
 * Renders a MUI button with dynamic sizing.
 * @returns A MUI Button.
 */
export default function DynamicButton({ children, ...props }: ButtonBaseOwnProps & ButtonOwnProps & {
    readonly children?: ReactNode;
}): ReactElement {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
    const buttonSize = isMobile ? "small" : "large";

    return (
        <Button LinkComponent={props.LinkComponent ?? Link} size={buttonSize} {...props}>
            {children}
        </Button>
    );
}
