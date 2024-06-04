import {
    Accordion, AccordionDetails, AccordionSummary,
    Button,
    Card, CardActions, CardContent, CardMedia,
    Stack,
    Typography,
    Zoom,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import type { ReactElement } from "react";
import type { Repo } from "api/github";

/**
 * Renders a GitHub repository.
 * @param props - An object containing the component props.
 * @returns An element which renders a GitHub repository.
 */
export default function GitHubRepo({ repo }: { readonly repo: Repo; }): ReactElement {
    // Maps the repository languages into a more readable format.
    const nonPrimaryLanguages = repo.languages.nodes.map((lang) => lang.name).filter((name) => name !== repo.primaryLanguage?.name);
    const repoLanguages = (
        <>
            <strong>{repo.primaryLanguage?.name}</strong>{nonPrimaryLanguages.length > 0 ? `, ${nonPrimaryLanguages.join(", ")}` : ""}
        </>
    );

    // Returns a Zoom element wrapping the repository to make it look nicer when loading in.
    return (
        <Zoom in>
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
                        {repo.primaryLanguage === null
                            ? undefined
                            : (
                                <>
                                    <Typography variant="h6">Languages</Typography>
                                    <Typography>{repoLanguages}</Typography>
                                </>
                            )}
                        <CardActions>
                            <Stack alignItems="center" direction="row" justifyContent="space-evenly" width="100%">
                                {
                                    repo.isPrivate
                                        ? undefined
                                        : <Button href={repo.url} size="small" variant="text">View Code</Button>
                                }
                                {
                                    repo.isPrivate
                                        ? undefined
                                        : (
                                            <Button
                                                href={repo.homepageUrl !== null && repo.homepageUrl.length > 0
                                                    ? repo.homepageUrl
                                                    : `https://oathompsonjones.github.io/${repo.name}`}
                                                size="small"
                                                variant="text"
                                            >
                                                View Site
                                            </Button>
                                        )
                                }
                            </Stack>
                        </CardActions>
                        {repo.description}
                    </AccordionDetails>
                </Accordion>
            </Card>
        </Zoom>
    );
}
