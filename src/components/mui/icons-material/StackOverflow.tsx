import type { ReactElement } from "react";
import StackOverflowLogo from "images/stackOverflow.svg";
import SvgIcon from "@mui/material/SvgIcon";

/**
 * Renders a Stack Overflow logo.
 * @returns The Stack Overflow logo.
 */
export function StackOverflow(): ReactElement {
    return (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <SvgIcon component={StackOverflowLogo} inheritViewBox />
    );
}
