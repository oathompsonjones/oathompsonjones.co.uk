import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardActions, CardContent, CardMedia, Typography, Zoom } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { GitHub } from "../../../API";
import { Stack } from "@mui/system";

export const GitHubRepo = (props: { index: number; repo: GitHub.IRepo; }): JSX.Element => {
    const { repo, index } = props;
    const repoLanguages = repo.primaryLanguage === null ? "N/A" : `${repo.primaryLanguage.name} ${(
        (languages: string[]): string => languages.length > 0 ? `(${languages.join(", ")})` : ""
    )(repo.languages.nodes.map((lang) => lang.name).filter((name) => name !== repo.primaryLanguage?.name))}`;

    return (
        <Zoom in style={{ transitionDelay: `${index * 100}ms` }}>
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
                        {
                            repo.nameWithOwner.split("/")[0] !== "oathompsonjones"
                                ? <>
                                    <Typography variant="h6">Team</Typography>
                                    <Typography>{repo.nameWithOwner.split("/")[0]}</Typography>
                                </>
                                : ""
                        }
                        <Typography variant="h6">Languages</Typography>
                        <Typography>{repoLanguages}</Typography>
                        <CardActions>
                            <Stack direction="row" justifyContent="space-evenly" alignItems="center" width="100%">
                                {
                                    !repo.isPrivate
                                        ? <Button size="small" href={repo.url}>View Code</Button>
                                        : <Button size="small" disabled>View Code</Button>
                                }
                                {
                                    repo.homepageUrl !== null && repo.homepageUrl.length > 0
                                        ? <Button size="small" href={repo.homepageUrl}>View Site</Button>
                                        : repo.isPrivate
                                            ? <Button size="small" disabled>View Site</Button>
                                            : <Button size="small" href={`https://oathompsonjones.github.io/${repo.name}`}>View Site</Button>
                                }
                            </Stack>
                        </CardActions>
                        {repo.description}
                    </AccordionDetails>
                </Accordion>
            </Card>
        </Zoom>
    );
};