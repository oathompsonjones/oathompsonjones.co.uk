import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardActions, CardContent, CardMedia, Typography, Zoom } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { GitHub } from "../../../API";
import { Stack } from "@mui/system";

/**
 * Renders a GitHub repository.
 *
 * @param {{ index: number; repo: GitHub.IRepo; }} props An object containing the component props.
 * @param {number} props.index The index of the repository, required to allow proper rendering by React.
 * @param {GitHub.IRepo} props.repo The repository object.
 * @returns {JSX.Element} An element which renders a GitHub repository.
 */
export const GitHubRepo = ({ index, repo }: { index: number; repo: GitHub.IRepo; }): JSX.Element => {
    // Maps the repository languages into a more readable format.
    const repoLanguages = repo.primaryLanguage === null ? "N/A" : `${repo.primaryLanguage.name} ${(
        (languages: string[]): string => languages.length > 0 ? `(${languages.join(", ")})` : ""
    )(repo.languages.nodes.map((lang) => lang.name).filter((name) => name !== repo.primaryLanguage?.name))}`;

    // Returns a Zoom element wrapping the repository to make it look nicer when loading in.
    return <Zoom in style={{ transitionDelay: `${index * 100}ms` }}>
        {/* This Card element contains the repository. */}
        <Card>
            {/* Renders the repository image. */}
            <CardMedia component="img" image={repo.image} />
            {/* Renders the repository name. */}
            <CardContent>
                <Typography variant="h6">{repo.name}</Typography>
            </CardContent>
            {/* Renders an Accordion to hide extra information by default. */}
            <Accordion>
                {/* Renders a Learn More button. */}
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography>Learn More</Typography>
                </AccordionSummary>
                {/* Renders the extra information. */}
                <AccordionDetails>
                    {/* Renders the repository team name, if there is one. */}
                    {repo.nameWithOwner.split("/")[0] !== "oathompsonjones"
                        ? <>
                            <Typography variant="h6">Team</Typography>
                            <Typography>{repo.nameWithOwner.split("/")[0]}</Typography>
                        </>
                        : ""}
                    {/* Renders the languages used in this repository. */}
                    <Typography variant="h6">Languages</Typography>
                    <Typography>{repoLanguages}</Typography>
                    {/* Renders buttons to goto the repository or its website. */}
                    <CardActions>
                        <Stack direction="row" justifyContent="space-evenly" alignItems="center" width="100%">
                            {!repo.isPrivate
                                ? <Button size="small" href={repo.url}>View Code</Button>
                                : <Button size="small" disabled>View Code</Button>}
                            {repo.homepageUrl !== null && repo.homepageUrl.length > 0
                                ? <Button size="small" href={repo.homepageUrl}>View Site</Button>
                                : repo.isPrivate
                                    ? <Button size="small" disabled>View Site</Button>
                                    : <Button size="small" href={`https://oathompsonjones.github.io/${repo.name}`}>View Site</Button>}
                        </Stack>
                    </CardActions>
                    {/* Renders the repository description. */}
                    {repo.description}
                </AccordionDetails>
            </Accordion>
        </Card>
    </Zoom>;
};