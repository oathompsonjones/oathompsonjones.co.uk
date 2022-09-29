import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardActions, CardContent, CardMedia, Typography, Zoom } from "@mui/material";
import React, { Component } from "react";
import { ExpandMore } from "@mui/icons-material";
import { GitHub } from "../../../Typings";
import { Stack } from "@mui/system";

export default class GitHubRepo extends Component<{ index: number; repo: GitHub.IRepo; }> {
    public constructor(public readonly props: { index: number; repo: GitHub.IRepo; }) {
        super(props);
    }

    public render(): JSX.Element {
        const { repo, index } = this.props;
        const repoLanguages = `${repo.primaryLanguage.name} ${(
            (languages: string[]): string => languages.length > 0 ? `(${languages.join(", ")})` : ""
        )(repo.languages.nodes.map((lang) => lang.name).filter((name) => name !== repo.primaryLanguage.name))}`;

        return (
            <Zoom in style={{ transitionDelay: `${index * 100}ms` }}>
                <Card>
                    <CardMedia component="img" image={repo.image} />
                    <CardContent>
                        <Typography component="h1" variant="h5">{repo.name}</Typography>
                    </CardContent>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography>Learn More</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {
                                repo.nameWithOwner.split("/")[0] !== "oathompsonjones"
                                    ? <>
                                        <Typography component="h6" variant="h6">Team</Typography>
                                        <Typography component="p" variant="body1">{repo.nameWithOwner.split("/")[0]}</Typography>
                                    </>
                                    : ""
                            }
                            <Typography component="h6" variant="h6">Languages</Typography>
                            <Typography component="p" variant="body1">{repoLanguages}</Typography>
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
                                            : <Button size="small" disabled>View Site</Button>
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
}