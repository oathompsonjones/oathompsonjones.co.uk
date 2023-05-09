import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ExpandMore from "@mui/icons-material/ExpandMore";
import type { IRepo } from "@/app/api/github";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";

/**
 * Renders a GitHub repository.
 *
 * @param {{ repo: IRepo; }} props An object containing the component props.
 * @param {IRepo} props.repo The repository object.
 * @returns {JSX.Element} An element which renders a GitHub repository.
 */
export default function GitHubRepo({ repo }: { repo: IRepo; }): JSX.Element {
    // Maps the repository languages into a more readable format.
    const repoLanguages = repo.primaryLanguage === null ? "N/A" : `${repo.primaryLanguage.name} ${(
        (languages: string[]): string => (languages.length > 0 ? `(${languages.join(", ")})` : "")
    )(repo.languages.nodes.map((lang) => lang.name).filter((name) => name !== repo.primaryLanguage?.name))}`;

    // Returns a Zoom element wrapping the repository to make it look nicer when loading in.
    return (
        <Zoom in>
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
                        {repo.nameWithOwner.split("/")[0] === "oathompsonjones" ? "" : (
                            <>
                                <Typography variant="h6">Team</Typography>
                                <Typography>{repo.nameWithOwner.split("/")[0]}</Typography>
                            </>
                        )}
                        {/* Renders the languages used in this repository. */}
                        <Typography variant="h6">Languages</Typography>
                        <Typography>{repoLanguages}</Typography>
                        {/* Renders buttons to goto the repository or its website. */}
                        <CardActions>
                            <Stack alignItems="center" direction="row" justifyContent="space-evenly" width="100%">
                                {
                                    repo.isPrivate
                                        ? <Button disabled size="small">View Code</Button>
                                        : <Button href={repo.url} size="small">View Code</Button>
                                }
                                {
                                    repo.isPrivate
                                        ? <Button disabled size="small">View Site</Button>
                                        : (
                                            <Button
                                                href={repo.homepageUrl !== null && repo.homepageUrl.length > 0
                                                    ? repo.homepageUrl
                                                    : `https://oathompsonjones.github.io/${repo.name}`}
                                                size="small"
                                            >
                                                View Site
                                            </Button>
                                        )
                                }
                            </Stack>
                        </CardActions>
                        {/* Renders the repository description. */}
                        {repo.description}
                    </AccordionDetails>
                </Accordion>
            </Card>
        </Zoom>
    );
}
