"use client";

import { Button, ButtonGroup, Grid, IconButton, Tooltip } from "@mui/material";
import { Email, Facebook, GitHub, Instagram, LinkedIn, Twitter, X } from "@mui/icons-material";
import { Discord } from "components/icons/Discord";
import type { GridSize } from "@mui/material";
import Link from "next/link";
import type { ReactNode } from "react";
import { StackOverflow } from "components/icons/StackOverflow";
import { useState } from "react";

type SocialLink = {
    label: string;
    alternateLabel?: string;
    icon: ReactNode;
    alternateIcon?: ReactNode;
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
        alternateIcon: <Twitter />,
        alternateLabel: "Twitter",
        hoverColor: "#1DA1F2",
        icon: <X />,
        label: "X",
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
 * Gets the size of a grid item for a social link at a given index and screen size.
 * @param size - The size of the screen (e.g. "lg", "md", "sm", "xs").
 * @param index - The index of the social link in the list.
 * @returns The size of the grid item for the social link at the given index and screen size.
 */
function getSize(size: "lg" | "md" | "sm" | "xs", index: number): GridSize {
    const lineLength = { lg: 5, md: 4, sm: 3, xs: 2 }[size];

    return index >= socials.length - socials.length % lineLength
        ? "grow"
        : socials.length / lineLength;
}

/** Does nothing. */
function voidFn(): void {
    void 0;
}

/**
 * Renders a list of social media links.
 * @param props - The component props.
 * @param props.large - Whether to render the large version of the icons.
 * @returns A list of social media links.
 */
export function SocialLinks({ large = false }: { large?: boolean; }): ReactNode {
    const [useAlternate, setUseAlternate] = useState<boolean>(false);

    if (large) {
        return (
            <Grid container spacing={1} columns={socials.length}>
                {socials.map(({ alternateIcon, alternateLabel, hoverColor, icon, label, link }, i) => {
                    const logo = useAlternate && alternateIcon !== undefined ? alternateIcon : icon;
                    const title = useAlternate && alternateLabel !== undefined ? alternateLabel : label;

                    return (
                        <Grid key={i} size={(["xs", "sm", "md", "lg"] as const).map((size) => getSize(size, i))}>
                            <Button
                                onMouseEnter={alternateIcon === undefined ? voidFn : (): void => setUseAlternate(true)}
                                onMouseLeave={alternateIcon === undefined ? voidFn : (): void => setUseAlternate(false)}
                                LinkComponent={Link}
                                href={link}
                                startIcon={logo}
                                color="inherit"
                                variant="text"
                                sx={{
                                // eslint-disable-next-line @typescript-eslint/naming-convention
                                    "&:hover": { backgroundColor: hoverColor ?? "inherit" },
                                    display: "flex",
                                }}>
                                {title}
                            </Button>
                        </Grid>
                    );
                })}
            </Grid>
        );
    }

    return (
        <ButtonGroup sx={{ alignItems: "center", justifyContent: "space-evenly", width: "min-content" }}>
            {socials.map(({ alternateIcon, alternateLabel, hoverColor, icon, label, link, username }, i) => {
                const title = `${useAlternate && alternateLabel !== undefined
                    ? alternateLabel
                    : label}: ${username ?? "@oathompsonjones"}`;
                const logo = useAlternate && alternateIcon !== undefined ? alternateIcon : icon;

                return (
                    <Tooltip key={i} title={title} arrow>
                        <IconButton
                            onMouseEnter={alternateIcon === undefined ? voidFn : (): void => setUseAlternate(true)}
                            onMouseLeave={alternateIcon === undefined ? voidFn : (): void => setUseAlternate(false)}
                            component={Link}
                            href={link}
                            prefetch={false}
                            color="inherit"
                            sx={{
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                                "&:hover": { color: hoverColor ?? "inherit" },
                                padding: 0.5,
                            }}>{logo}</IconButton>
                    </Tooltip>
                );
            })}
        </ButtonGroup>
    );
}
