import { Email, Facebook, GitHub, Instagram, LinkedIn } from "@mui/icons-material";
import { Discord } from "components/icons/Discord";
import { Divider } from "@mui/material";
import Link from "next/link";
import type { ReactNode } from "react";
import Stack from "components/layout/stack";
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
    const socials: Array<{ icon: ReactNode; link: string; }> = [
        { icon: <Email />, link: "/email" },
        { icon: <GitHub />, link: "/github" },
        { icon: <StackOverflow />, link: "/stackoverflow" },
        { icon: <LinkedIn />, link: "/linkedin" },
        { icon: <Discord />, link: "/discord" },
        { icon: <TwitterX />, link: "/twitter" },
        { icon: <Instagram />, link: "/instagram" },
        { icon: <Facebook />, link: "/facebook" },
    ];

    const divider = dividers ? <Divider flexItem orientation="vertical" sx={{ m: 0 }} /> : undefined;

    return (
        <Stack direction="row" divider={divider} sx={{ alignItems: "center", justifyContent: "space-evenly" }}>
            {socials.map(({ icon, link }, i) => (
                <Link href={link} key={i} prefetch={false} style={{ color: "inherit" }}>
                    {icon}
                </Link>
            ))}
        </Stack>
    );
}
