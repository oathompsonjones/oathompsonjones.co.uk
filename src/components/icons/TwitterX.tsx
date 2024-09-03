"use client";

import type { ReactNode } from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { Twitter } from "@mui/icons-material";
import { X } from "@mui/icons-material";
import { useState } from "react";

/**
 * Renders a Twitter/X icon.
 * @returns The Twitter/X icon.
 */
export function TwitterX(): ReactNode {
    const [useOldLogo, setUseOldLogo] = useState<boolean>(false);

    return (
        <SvgIcon
            onMouseEnter={(): void => setUseOldLogo(true)}
            onMouseLeave={(): void => setUseOldLogo(false)}
            inheritViewBox
        >
            {useOldLogo ? <Twitter /> : <X />}
        </SvgIcon>
    );
}
