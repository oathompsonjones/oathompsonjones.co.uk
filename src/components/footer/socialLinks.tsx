import { Button, ButtonGroup, Grid, IconButton, Tooltip } from "@mui/material";
import { Email, Facebook, GitHub, Instagram, LinkedIn } from "@mui/icons-material";
import { Discord } from "components/icons/Discord";
import type { GridSize } from "@mui/material";
import Link from "next/link";
import type { ReactNode } from "react";
import { StackOverflow } from "components/icons/StackOverflow";
import { TwitterX } from "components/icons/TwitterX";

type SocialLink = {
    label: string;
    icon: ReactNode;
    link: string;
    hoverColor?: string;
    username?: string;
};

const socials: SocialLink[] = [
    {
        hoverColor: "#D14836",
        icon: <Email />,
        label: "Email",
        link: "/email",
        username: "oathompsonjones@gmail.com",
    },
    {
        hoverColor: "#333",
        icon: <GitHub />,
        label: "GitHub",
        link: "/github",
    },
    {
        hoverColor: "#F48024",
        icon: <StackOverflow />,
        label: "StackOverflow",
        link: "/stackoverflow",
    },
    {
        hoverColor: "#0A66C2",
        icon: <LinkedIn />,
        label: "LinkedIn",
        link: "/linkedin",
    },
    {
        hoverColor: "#5865F2",
        icon: <Discord />,
        label: "Discord",
        link: "/discord",
    },
    {
        hoverColor: "#1DA1F2",
        icon: <TwitterX />,
        label: "Twitter/X",
        link: "/twitter",
    },
    {
        hoverColor: "#E4405F",
        icon: <Instagram />,
        label: "Instagram",
        link: "/instagram",
    },
    {
        hoverColor: "#1877F2",
        icon: <Facebook />,
        label: "Facebook",
        link: "/facebook",
        username: "Ollie Jones",
    },
];

/**
 * Renders a list of social media links.
 * @param props - The component props.
 * @param props.large - Whether to render the large version of the icons.
 * @returns A list of social media links.
 */
export function SocialLinks({ large = false }: { large?: boolean; }): ReactNode {
    const getSize = (size: "lg" | "md" | "sm" | "xs", index: number): GridSize => {
        const lineLength = { lg: 5, md: 4, sm: 3, xs: 2 }[size];

        return index >= socials.length - socials.length % lineLength
            ? "grow"
            : socials.length / lineLength;
    };

    if (large) {
        return (
            <Grid container spacing={1} columns={socials.length}>
                {socials.map(({ hoverColor, icon, label, link }, i) => (
                    <Grid key={i} size={(["xs", "sm", "md", "lg"] as const).map((size) => getSize(size, i))}>
                        <Button
                            href={link}
                            startIcon={icon}
                            color="inherit"
                            variant="text"
                            sx={{
                                // eslint-disable-next-line @typescript-eslint/naming-convention
                                "&:hover": { backgroundColor: hoverColor ?? "inherit" },
                                display: "flex",
                            }}>
                            {label}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        );
    }

    return (
        <ButtonGroup sx={{ alignItems: "center", justifyContent: "space-evenly", width: "min-content" }}>
            {socials.map(({ hoverColor, icon, label, link, username }, i) => (
                <Tooltip key={i} title={`${label}: ${username ?? "@oathompsonjones"}`} arrow>
                    <IconButton
                        component={Link}
                        href={link}
                        prefetch={false}
                        color="inherit"
                        sx={{
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            "&:hover": { color: hoverColor ?? "inherit" },
                            padding: 0.5,
                        }}>{icon}</IconButton>
                </Tooltip>
            ))}
        </ButtonGroup>
    );
}
