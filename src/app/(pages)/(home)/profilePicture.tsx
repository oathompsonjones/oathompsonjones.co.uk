import { Avatar } from "@mui/material";
import { GRAVATAR_URL } from "utils";
import type { ReactElement } from "react";

/**
 * A div which will be used to either fade in or out.
 * @param children - The children.
 * @returns A div.
 */
export function ProfilePicture({ positioner }: { readonly positioner?: boolean; }): ReactElement {
    const isPositioner = positioner ?? false;

    return (
        <Avatar
            className={isPositioner ? "avatarPosition" : "avatar"}
            src={GRAVATAR_URL}
            sx={{
                boxShadow: isPositioner ? 0 : 20,
                display: {
                    md: "block",
                    xs: isPositioner ? "block" : "none",
                },
                filter: isPositioner ? { md: "opacity(0%)" } : undefined,
                height: "auto",
                position: isPositioner ? undefined : "fixed",
                transition: [
                    "left 0.5s linear",
                    "top 0.5s linear",
                    "width 0.5s linear",
                    "height 0.5s linear",
                    "filter 0.25s linear",
                ].join(", "),
                width: { md: "30%", sm: "50%", xs: "90%" },
            }}
        />
    );
}
