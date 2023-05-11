"use client";
import StackOverflowLogo from "@/images/stackOverflow.svg";
import SvgIcon from "@mui/material/SvgIcon";

export default function StackOverflow(): JSX.Element {
    return (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <SvgIcon component={StackOverflowLogo} inheritViewBox />
    );
}
