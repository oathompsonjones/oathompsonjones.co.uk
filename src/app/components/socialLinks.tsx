import { Divider, Link, Stack } from "@mui/material";
import { Email, Facebook, GitHub, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import type { ReactElement } from "react";

export function SocialLinks({ dividers = false }: { dividers?: boolean; }): JSX.Element {
    // Links a URL and an icon for each social media to display.
    const socials: Array<{ icon: ReactElement; link: string; }> = [
        { icon: <span className="material-icons">discord</span>, link: "/discord" },
        { icon: <GitHub />, link: "/github" },
        { icon: <LinkedIn />, link: "/linkedin" },
        { icon: <Twitter />, link: "/twitter" },
        { icon: <Instagram />, link: "/instagram" },
        { icon: <Facebook />, link: "/facebook" },
        { icon: <Email />, link: "/email" }
    ];

    return (
        <Stack
            alignItems="center"
            direction="row"
            divider={dividers ? <Divider flexItem orientation="vertical" /> : undefined}
            justifyContent="space-evenly"
        >
            {socials.map(({ icon, link }, i) => (
                <Link color="inherit" href={link} key={i} sx={{ textDecoration: "none" }}>
                    {icon}
                </Link>
            ))}
        </Stack>
    );
}
