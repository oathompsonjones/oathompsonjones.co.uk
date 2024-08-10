"use client";

import { Button, ButtonBaseOwnProps, ButtonOwnProps } from "@mui/material";
import useWindowSize from "hooks/useWindowSize";
import Link from "next/link";
import type { ReactElement, ReactNode } from "react";

/**
 * Renders a MUI button with dynamic sizing.
 * @returns A MUI Button.
 */
export default function DynamicButton({ children, ...props }: ButtonBaseOwnProps & ButtonOwnProps & {
    readonly children?: ReactNode;
}): ReactElement {
    const { width } = useWindowSize();
    const buttonSize = width > 600 ? "large" : "small";

    return (
        <Button LinkComponent={props.LinkComponent ?? Link} size={buttonSize} {...props}>
            {children}
        </Button>
    );
}
