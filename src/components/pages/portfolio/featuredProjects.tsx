import { Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { GitHub, OpenInNew } from "@mui/icons-material";
import { Card } from "components/card";
import type { ReactNode } from "react";
import type { Repo } from "actions/github";

export type FeaturedProject = {
    description: string;
    name: string;
    repo?: Repo;
};

export type FeaturedProjectsProps = {
    readonly projects?: FeaturedProject[];
};

export const FEATURED_REPOSITORIES = [
    {
        description: [
            "An interactive environment for learning and experimenting with Haskell, ",
            "created as an undergraduate honours project. Learning Haskell is difficult ",
            "without fast feedback, since most tooling is text-only and gives no visual intuition ",
            "for how functions behave. Haskell's lazy evaluation and purely functional model don't ",
            "map naturally onto interactive graphics, so I designed an interface layer that could ",
            "sample and render lazily-evaluated output in real time without breaking referential ",
            "transparency. I built a web-based playground combining a Haskell interpreter with a live ",
            "code editor and a canvas renderer, letting users write Haskell functions and immediately ",
            "see them plotted or animated on screen.",
        ].join(""),
        name: "Graphical Playground for Haskell",
        repository: "A-Graphical-Playground-for-Haskell",
    },
    {
        description: [
            "A Minecraft mod built around a playful item system, with socks that grant their wearer ",
            "unique abilities. I wanted to add genuinely new gameplay mechanics rather than just ",
            "reskinning existing items, but Minecraft's modding APIs weren't designed for arbitrary ",
            "equipment-driven abilities. Triggering effects reliably meant hooking into low-level tick ",
            "and event systems while keeping things compatible with vanilla gameplay and other mods. ",
            "The mod shipped on the Fabric API with a working set of socks, each granting its wearer a ",
            "distinct ability.",
        ].join(""),
        name: "Rock Your Socks Off",
        repository: "rock-your-socks-off",
    },
    {
        description: [
            "A TypeScript collection of playable mini-games, including the games running in the website's ",
            "arcade. I wanted a reusable, well-tested codebase of classic games I could embed anywhere, ",
            "rather than writing one-off implementations for each. Sharing a single engine across very ",
            "different games meant designing abstractions general enough for turn-based and real-time games ",
            "alike, without forcing awkward workarounds into any individual game. The result is a shared ",
            "TypeScript game engine handling the game loop, input, and rendering, which now powers every ",
            "game in this site's arcade section.",
        ].join(""),
        name: "MiniGames",
        repository: "MiniGames",
    },
] as const;

/**
 * Renders the projects selected to represent the breadth of the portfolio.
 * @param props - The component properties.
 * @param props.projects - The selected projects with GitHub repository data.
 * @returns The featured project cards.
 */
export function FeaturedProjects({ projects }: FeaturedProjectsProps): ReactNode {
    // Without API data, render the static content with placeholders for the dynamic parts.
    const items: FeaturedProject[] = projects ?? FEATURED_REPOSITORIES.map(({ description, name }) => ({
        description,
        name,
    }));

    return (
        <Stack sx={{ gap: 2 }}>
            <Typography variant="h4">Featured Projects</Typography>

            <Grid container spacing={2}>
                {items.map((project) => (
                    <Grid key={project.name} size={{ md: 4, xs: 12 }}>
                        <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                            {project.repo
                                ? (
                                    <Card.Media
                                        component="img"
                                        image={project.repo.image}
                                        sx={{ aspectRatio: "2 / 1", objectFit: "cover" }}
                                    />
                                )
                                : (
                                    <Skeleton
                                        sx={{ aspectRatio: "2 / 1", borderRadius: "1rem", height: "auto" }}
                                        variant="rectangular"
                                    />
                                )}
                            <Card.Content
                                sx={{ display: "flex", flexDirection: "column", flexGrow: 1, gap: 1 }}
                            >
                                <Typography variant="h5">{project.name}</Typography>
                                <Typography color="text.secondary" variant="body2">{project.description}</Typography>
                                <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75, mt: "auto", pt: 1 }}>
                                    {project.repo === undefined && <Skeleton variant="text" width={120} />}
                                    {project.repo
                                        ? [
                                            project.repo.primaryLanguage?.name,
                                            ...project.repo.languages.nodes.map((language) => language.name),
                                        ]
                                            .filter((language, index, languages) => language !== undefined &&
                                            languages.indexOf(language) === index)
                                            .slice(0, 4)
                                            .map((language) => (
                                                <Typography color="text.secondary" key={language} variant="caption">
                                                    {language}
                                                </Typography>
                                            ))
                                        : null}
                                </Stack>
                            </Card.Content>
                            <Card.Actions>
                                {project.repo === undefined && (
                                    <Skeleton height={30} variant="rounded" width={100} />
                                )}
                                {project.repo !== undefined && (
                                    <Button
                                        href={project.repo.url}
                                        rel="noreferrer"
                                        size="small"
                                        startIcon={<GitHub />}
                                        target="_blank"
                                    >
                                        View code
                                    </Button>
                                )}
                                {project.repo?.homepageUrl !== undefined && project.repo.homepageUrl !== null &&
                                    project.repo.homepageUrl.trim() !== "" && (
                                    <Button
                                        href={project.repo.homepageUrl}
                                        rel="noreferrer"
                                        size="small"
                                        startIcon={<OpenInNew />}
                                        target="_blank"
                                    >
                                        View project
                                    </Button>
                                )}
                            </Card.Actions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
