import { Discord, Email, Facebook, GitHub, Instagram, LinkedIn, StackOverflow, TwitterX } from "@mui/icons-material";
import { Divider, Stack } from "@mui/material";
import Link from "next/link";
import type { ReactElement } from "react";

/**
 * Renders a list of social media links.
 * @param props - The properties of the component.
 * @param props.dividers - Whether to display dividers between the links.
 * @returns A list of social media links.
 */
export function SocialLinks({ dividers = false }: { dividers?: boolean; }): ReactElement {
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
            divider={dividers ? <Divider flexItem orientation="vertical" sx={{ m: 0 }} /> : undefined}
            justifyContent="space-evenly"
        >
            {socials.map(({ icon, link }, i) => (
                <Link href={link} key={i} prefetch={false} style={{ color: "inherit" }}>
                    {icon}
                </Link>
            ))}
        </Stack>
    );
}