import {
    Accordion, AccordionDetails, AccordionSummary,
    Button,
    Card, CardActions, CardContent, CardMedia,
    Chip,
    Typography,
    Zoom,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import type { ReactNode } from "react";
import type { Repo } from "api/github/route";
import Stack from "components/layout/stack";

/**
 * Renders a GitHub repository.
 * @param props - An object containing the component props.
 * @param props.repo - The repository to render.
 * @returns An element which renders a GitHub repository.
 */
export function GitHubRepo({ repo }: { repo: Repo; }): ReactNode {
    // Maps the repository languages into a more readable format.
    const langs = repo.languages.nodes.map((lang) => lang.name).filter((name) => name !== repo.primaryLanguage?.name);
    const repoLanguages = (
        <>
            <Chip label={repo.primaryLanguage?.name} />
            {langs.map((lang, i) => (<Chip key={i} label={lang} variant="outlined" />))}
        </>
    );

    const homepageURL = repo.homepageUrl !== null && repo.homepageUrl.length > 0
        ? repo.homepageUrl
        : `https://oathompsonjones.github.io/${repo.name}`;

    // Returns a Zoom element wrapping the repository to make it look nicer when loading in.
    return (
        <Zoom in timeout={500}>
            <Card>
                <CardMedia component="img" image={repo.image} />
                <CardContent>
                    <Typography variant="h6">{repo.name}</Typography>
                </CardContent>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography>Learn More</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {repo.nameWithOwner.split("/")[0] === "oathompsonjones"
                            ? ""
                            : (
                                <>
                                    <Typography variant="h6">Team</Typography>
                                    <Typography>{repo.nameWithOwner.split("/")[0]}</Typography>
                                </>
                            )}
                        <Typography>{repo.description}</Typography>
                        <CardActions>
                            <Stack
                                direction="row"
                                sx={{
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    width: "100%",
                                }}>
                                {repo.isPrivate
                                    ? undefined
                                    : <Button href={repo.url} size="small" variant="text">View Code</Button>}
                                {repo.isPrivate
                                    ? undefined
                                    : (<Button href={homepageURL} size="small" variant="text">View Site</Button>)}
                            </Stack>
                        </CardActions>
                        <br />
                        {repo.primaryLanguage === null ? undefined : repoLanguages}
                    </AccordionDetails>
                </Accordion>
            </Card>
        </Zoom>
    );
}
