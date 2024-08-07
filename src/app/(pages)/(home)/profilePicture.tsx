"use client";

import { Avatar } from "@mui/material";
import type { ReactElement } from "react";
import { GRAVATAR_URL } from "utils";

/**
 * A div which will be used to either fade in or out.
 * @param children - The children.
 * @returns A div.
 */
export default function ProfilePicture({ positioner }: { readonly positioner?: boolean; }): ReactElement {
    return (
        <Avatar
            className={positioner ? "avatarPosition" : "avatar"}
            src={GRAVATAR_URL}
            sx={{
                filter: positioner ? "opacity(0%)" : undefined,
                height: "auto",
                transition: ["left", "top", "width", "height"]
                    .map((prop) => `${prop} 0.5s ease`).join(", ") + ", filter 0.25s linear",
                width: { lg: "30%", md: "50%", sm: "70%", xs: "90%" },
                ...positioner ? {} : { boxShadow: 20, position: "fixed" }
            }}
        />
    );
}
