import { Avatar } from "@mui/material";
import { GRAVATAR_URL } from "utils";
import type { ReactNode } from "react";

/**
 * A div which will be used to either fade in or out.
 * @param props - The component properties.
 * @param props.positioner - Whether the profile picture is a positioner.
 * @returns A div.
 */
export function ProfilePicture({ positioner }: { positioner?: boolean; }): ReactNode {
    const isPositioner = positioner ?? false;

    return (
        <Avatar
            className={isPositioner ? "avatarPosition" : "avatar"}
            src={GRAVATAR_URL}
            sx={{
                boxShadow: "var(--boxShadow)",
                display: {
                    md: "block",
                    xs: "var(--display)",
                },
                filter: { md: "var(--filter)" },
                height: "auto",
                position: "var(--position)",
                transition: [
                    "left 0.5s linear",
                    "top 0.5s linear",
                    "width 0.5s linear",
                    "height 0.5s linear",
                    "filter 0.25s linear",
                ].join(", "),
                width: { md: "30%", sm: "50%", xs: "90%" },
            }}
            style={{
                /* eslint-disable @typescript-eslint/naming-convention */
                "--boxShadow": isPositioner ? "0" : "20",
                "--display": isPositioner ? "block" : "none",
                "--filter": isPositioner ? "opacity(0%)" : "",
                "--position": isPositioner ? "" : "fixed",
                /* eslint-enable @typescript-eslint/naming-convention */
            }}
        />
    );
}
