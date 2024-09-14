import { ButtonGroup, Divider, IconButton, Tooltip } from "@mui/material";
import { Email, Facebook, GitHub, Instagram, LinkedIn } from "@mui/icons-material";
import { Discord } from "components/icons/Discord";
import Link from "next/link";
import type { ReactNode } from "react";
import { StackOverflow } from "components/icons/StackOverflow";
import { TwitterX } from "components/icons/TwitterX";

/**
 * Renders a list of social media links.
 * @param props - The properties of the component.
 * @param props.dividers - Whether to display dividers between the links.
 * @returns A list of social media links.
 */
export function SocialLinks({ dividers = false }: { dividers?: boolean; }): ReactNode {
    // Links a URL and an icon for each social media to display.
    const socials: Array<{ icon: ReactNode; label: string; link: string; }> = [
        { icon: <Email />, label: "Email", link: "/email" },
        { icon: <GitHub />, label: "GitHub", link: "/github" },
        { icon: <StackOverflow />, label: "StackOverflow", link: "/stackoverflow" },
        { icon: <LinkedIn />, label: "LinkedIn", link: "/linkedin" },
        { icon: <Discord />, label: "Discord", link: "/discord" },
        { icon: <TwitterX />, label: "Twitter/X", link: "/twitter" },
        { icon: <Instagram />, label: "Instagram", link: "/instagram" },
        { icon: <Facebook />, label: "Facebook", link: "/facebook" },
    ];

    return (
        <ButtonGroup sx={{ alignItems: "center", justifyContent: "space-evenly" }}>
            {socials.map(({ icon, label, link }, i) => (
                <>
                    {dividers && i > 0 && <Divider key={`divider-${i}`} orientation="vertical" />}
                    <Tooltip key={`tooltip-${i}`} title={label} arrow>
                        <IconButton
                            component={Link}
                            href={link}
                            prefetch={false}
                            sx={{ color: "inherit", padding: "var(--padding)" }}
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            style={{ "--padding": dividers ? "0.5rem" : "0" }}
                        >
                            {icon}
                        </IconButton>
                    </Tooltip>
                </>
            ))}
        </ButtonGroup>
    );
}
