"use client";

import type { ReactNode } from "react";
import StackOverflowLogo from "assets/images/stackOverflow.svg";
import SvgIcon from "@mui/material/SvgIcon";

/**
 * Renders a Stack Overflow logo.
 * @returns The Stack Overflow logo.
 */
export function StackOverflow(): ReactNode {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return (<SvgIcon component={StackOverflowLogo} inheritViewBox />);
}
