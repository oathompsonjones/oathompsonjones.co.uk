import Discord from "@mui/icons-material/Discord";
import Divider from "@mui/material/Divider";
import Email from "@mui/icons-material/Email";
import Facebook from "@mui/icons-material/Facebook";
import GitHub from "@mui/icons-material/GitHub";
import Instagram from "@mui/icons-material/Instagram";
import Link from "next/link";
import LinkedIn from "@mui/icons-material/LinkedIn";
import type { ReactElement } from "react";
import Stack from "@mui/material/Stack";
import StackOverflow from "@mui/icons-material/StackOverflow";
import Twitter from "@mui/icons-material/Twitter";

export default function SocialLinks({ dividers = false }: { dividers?: boolean; }): JSX.Element {
    // Links a URL and an icon for each social media to display.
    const socials: Array<{ icon: ReactElement; link: string; }> = [
        { icon: <Email />, link: "/email" },
        { icon: <GitHub />, link: "/github" },
        { icon: <StackOverflow />, link: "/stackoverflow" },
        { icon: <LinkedIn />, link: "/linkedin" },
        { icon: <Discord />, link: "/discord" },
        { icon: <Twitter />, link: "/twitter" },
        { icon: <Instagram />, link: "/instagram" },
        { icon: <Facebook />, link: "/facebook" }
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
