import type { ReactElement } from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { Twitter } from "@mui/icons-material";
import { X } from "@mui/icons-material";
import { useState } from "react";

/**
 * Renders a Twitter/X icon.
 * @returns The Twitter/X icon.
 */
export default function TwitterX(): ReactElement {
    const [useTwitterLogo, setUseTwitterLogo] = useState<boolean>(false);

    return (
        <SvgIcon
            onMouseEnter={(): void => setUseTwitterLogo(true)}
            onMouseLeave={(): void => setUseTwitterLogo(false)}
            component={useTwitterLogo ? Twitter : X}
            inheritViewBox
        />
    );
}
