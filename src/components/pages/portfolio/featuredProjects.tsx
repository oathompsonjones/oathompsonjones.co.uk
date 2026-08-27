import { GitHub, OpenInNew } from "@mui/icons-material";
import { Button, Grid, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { Repo } from "actions/github";
import { Card } from "components/card";

export type FeaturedProject = {
    description: string;
    name: string;
    repo: Repo;
};

export const FEATURED_REPOSITORIES = [
    {
        description: "An interactive environment for learning and experimenting with Haskell, created as an undergraduate honours project.",
        name: "Graphical Playground for Haskell",
        repository: "A-Graphical-Playground-for-Haskell",
    },
    {
        description: "A Minecraft mod built around a playful item system, with socks that grant their wearer unique abilities.",
        name: "Rock Your Socks Off",
        repository: "rock-your-socks-off",
    },
    {
        description: "A TypeScript collection of playable mini-games, including the games running in the website's arcade.",
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
export function FeaturedProjects({ projects }: { projects: FeaturedProject[]; }): ReactNode {
    return (
        <Stack sx={{ gap: 2 }}>
            <Typography variant="h4">Featured Projects</Typography>

            <Grid container spacing={2}>
                {projects.map((project) => (
                    <Grid key={project.repo.nameWithOwner} size={{ md: 4, xs: 12 }}>
                        <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                            <Card.Media
                                component="img"
                                image={project.repo.image}
                                sx={{ aspectRatio: "2 / 1", objectFit: "cover" }}
                            />
                            <Card.Content sx={{ display: "flex", flexDirection: "column", flexGrow: 1, gap: 1 }}>
                                <Typography variant="h5">{project.name}</Typography>
                                <Typography color="text.secondary">{project.description}</Typography>
                                <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75, mt: "auto", pt: 1 }}>
                                    {[project.repo.primaryLanguage?.name, ...project.repo.languages.nodes.map((language) => language.name)]
                                        .filter((language, index, languages) => language !== undefined && languages.indexOf(language) === index)
                                        .slice(0, 4)
                                        .map((language) => (
                                            <Typography key={language} color="text.secondary" variant="caption">
                                                {language}
                                            </Typography>
                                        ))}
                                </Stack>
                            </Card.Content>
                            <Card.Actions>
                                <Button href={project.repo.url} rel="noreferrer" startIcon={<GitHub />} target="_blank" size="small">
                                    View code
                                </Button>
                                {project.repo.homepageUrl?.trim() !== "" && project.repo.homepageUrl !== null && (
                                    <Button href={project.repo.homepageUrl} rel="noreferrer" startIcon={<OpenInNew />} target="_blank" size="small">
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