"use client";

import DiscordLogo from "images/discord.svg";
import type { ReactNode } from "react";
import SvgIcon from "@mui/material/SvgIcon";

/**
 * Renders a Discord icon.
 * @returns The Discord icon.
 */
export function Discord(): ReactNode {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return (<SvgIcon component={DiscordLogo} inheritViewBox />);
}
