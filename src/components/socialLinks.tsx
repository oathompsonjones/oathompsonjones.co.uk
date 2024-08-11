import { Discord, Email, Facebook, GitHub, Instagram, LinkedIn, StackOverflow, TwitterX } from "@mui/icons-material";
import { Divider, Stack } from "@mui/material";
import Link from "next/link";
import type { ReactElement } from "react";

/**
 * Renders a list of social media links.
 * @param dividers - Whether to display dividers between the links.
 * @returns A list of social media links.
 */
export default function SocialLinks({ dividers = false }: { readonly dividers?: boolean; }): ReactElement {
    // Links a URL and an icon for each social media to display.
    const socials: Array<{ icon: ReactElement; link: string; }> = [
        { icon: <Email />, link: "/email" },
        { icon: <GitHub />, link: "/github" },
        { icon: <StackOverflow />, link: "/stackoverflow" },
        { icon: <LinkedIn />, link: "/linkedin" },
        { icon: <Discord />, link: "/discord" },
        { icon: <TwitterX />, link: "/twitter" },
        { icon: <Instagram />, link: "/instagram" },
        { icon: <Facebook />, link: "/facebook" },
    ];

    return (
        <Stack
            alignItems="center"
            direction="row"
            divider={dividers ? <Divider flexItem orientation="vertical" /> : undefined}
            justifyContent="space-evenly"
        >
            {socials.map(({ icon, link }, i) => (
                <Link href={link} key={i} legacyBehavior prefetch={false}>
                    <a style={{ color: "inherit" }}>{icon}</a>
                </Link>
            ))}
        </Stack>
    );
}
