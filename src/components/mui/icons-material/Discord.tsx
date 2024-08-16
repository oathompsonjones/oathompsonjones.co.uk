import DiscordLogo from "images/discord.svg";
import type { ReactElement } from "react";
import SvgIcon from "@mui/material/SvgIcon";

/**
 * Renders a Discord icon.
 * @returns The Discord icon.
 */
export function Discord(): ReactElement {
    return (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <SvgIcon component={DiscordLogo} inheritViewBox />
    );
}
