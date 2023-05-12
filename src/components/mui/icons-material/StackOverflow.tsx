"use client";
import StackOverflowLogo from "images/stackOverflow.svg";
import { SvgIcon } from "@mui/material";

export function StackOverflow(): JSX.Element {
    return (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <SvgIcon component={StackOverflowLogo} inheritViewBox />
    );
}
