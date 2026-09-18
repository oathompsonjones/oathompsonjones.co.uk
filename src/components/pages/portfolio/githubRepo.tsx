import { Button, Chip, Typography, Zoom } from "@mui/material";
import { GitHub, OpenInNew } from "@mui/icons-material";
import { Card } from "components/card";
import type { ReactNode } from "react";
import type { Repo } from "actions/github";
import { Stack } from "@mui/system";

/**
 * Renders a GitHub repository.
 * @param props - An object containing the component props.
 * @param props.repo - The repository to render.
 * @returns An element which renders a GitHub repository.
 */
export function GitHubRepo({ repo }: { readonly repo: Repo; }): ReactNode {
    const langs = repo.languages.nodes
        .map((lang) => lang.name)
        .filter((name) => name !== repo.primaryLanguage?.name);
    const repoLanguages = (
        <>
            <Chip label={repo.primaryLanguage?.name} />
            {langs.map((lang, index) => (
                <Chip key={`${repo.nameWithOwner}-${lang}-${index}`} label={lang} variant="outlined" />
            ))}
        </>
    );

    const homepageURL = repo.homepageUrl?.trim() ?? null;
    const hasHomepage = homepageURL !== null && homepageURL !== "";
    const [owner] = repo.nameWithOwner.split("/");

    return (
        <Zoom in timeout={500}>
            <Card>
                <Card.Media component="img" image={repo.image} />
                <Card.Header subheader={repo.primaryLanguage?.name} title={repo.name} />
                <Card.Accordion>
                    <Card.Content>
                        {owner === "oathompsonjones"
                            ? ""
                            : (
                                <>
                                    <Typography variant="h6">Team</Typography>
                                    <Typography>{owner}</Typography>
                                </>
                            )}
                        <Typography>{repo.description}</Typography>
                    </Card.Content>
                    <Card.Actions>
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                width: "100%",
                            }}
                        >
                            <Button href={repo.url} size="small" startIcon={<GitHub />} variant="text">
                                View Code
                            </Button>
                            {hasHomepage
                                ? (
                                    <Button href={homepageURL} size="small" startIcon={<OpenInNew />} variant="text">
                                        View Site
                                    </Button>
                                )
                                : null}
                        </Stack>
                    </Card.Actions>
                    <br />
                    {repo.primaryLanguage === null ? undefined : repoLanguages}
                </Card.Accordion>
            </Card>
        </Zoom>
    );
}
