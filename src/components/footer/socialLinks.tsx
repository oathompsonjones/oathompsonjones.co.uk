import { ButtonGroup, IconButton, Tooltip } from "@mui/material";
import { Email, Facebook, GitHub, Instagram, LinkedIn } from "@mui/icons-material";
import { Discord } from "components/icons/Discord";
import Link from "next/link";
import type { ReactNode } from "react";
import { StackOverflow } from "components/icons/StackOverflow";
import { TwitterX } from "components/icons/TwitterX";

// Links a URL and an icon for each social media to display.
export const socials: Array<{ icon: ReactNode; label: string; link: string; name: string; }> = [
    { icon: <Email />, label: "Email", link: "/email", name: "oathompsonjones@gmail.com" },
    { icon: <GitHub />, label: "GitHub", link: "/github", name: "@oathompsonjones" },
    { icon: <StackOverflow />, label: "StackOverflow", link: "/stackoverflow", name: "@oathompsonjones" },
    { icon: <LinkedIn />, label: "LinkedIn", link: "/linkedin", name: "@oathompsonjones" },
    { icon: <Discord />, label: "Discord", link: "/discord", name: "@oathompsonjones" },
    { icon: <TwitterX />, label: "Twitter/X", link: "/twitter", name: "@oathompsonjones" },
    { icon: <Instagram />, label: "Instagram", link: "/instagram", name: "@oathompsonjones" },
    { icon: <Facebook />, label: "Facebook", link: "/facebook", name: "Ollie Jones" },
];

/**
 * Renders a list of social media links.
 * @returns A list of social media links.
 */
export function SocialLinks(): ReactNode {
    return (
        <ButtonGroup sx={{ alignItems: "center", justifyContent: "space-evenly", width: "min-content" }}>
            {socials.map(({ icon, label, link, name }, i) => (
                <Tooltip key={i} title={`${label}: ${name}`} arrow>
                    <IconButton component={Link} href={link} prefetch={false} sx={{ color: "inherit", padding: 0.5 }}>
                        {icon}
                    </IconButton>
                </Tooltip>
            ))}
        </ButtonGroup>
    );
}
