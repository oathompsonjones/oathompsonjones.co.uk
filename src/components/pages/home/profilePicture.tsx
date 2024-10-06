import { Avatar } from "@mui/material";
import { GRAVATAR_URL } from "utils";
import type { ReactNode } from "react";

/**
 * A div which will be used to either fade in or out.
 * @param props - The component properties.
 * @param props.positioner - Whether the profile picture is a positioner.
 * @param props.reducedMotion - Whether to reduce motion.
 * @returns A div.
 */
export function ProfilePicture(props: { positioner?: boolean; reducedMotion?: boolean; }): ReactNode {
    const isPositioner = "positioner" in props ? props.positioner : false;
    const reducedMotion = props.reducedMotion ?? false;

    return (
        <Avatar
            className={isPositioner ? "avatarPosition" : "avatar"}
            src={GRAVATAR_URL}
            sx={{
                // BoxShadow: "var(--boxShadow)",
                /* Display: {
                    md: "block",
                    xs: "var(--display)",
                }, */
                height: "auto",
                // Left: 0,
                // Opacity: { md: "var(--opacity)" },
                // Position: "var(--position)",
                // Top: 0,
                /* Transition: [
                    "transform 0.25s linear",
                    "width 0.25s linear",
                    "height 0.25s linear",
                ].join(", "), */
                width: { md: "30%", sm: "50%", xs: "90%" },
            }}
            style={{
                /* eslint-disable @typescript-eslint/naming-convention */
                "--boxShadow": isPositioner && !reducedMotion ? "0" : "20",
                "--display": isPositioner && !reducedMotion ? "block" : "none",
                "--opacity": isPositioner && !reducedMotion ? "0" : "1",
                "--position": isPositioner || reducedMotion ? "" : "fixed",
                /* eslint-enable @typescript-eslint/naming-convention */
            }}
        />
    );
}
