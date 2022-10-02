import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import React, { Component } from "react";
import { GitHub } from "../../../Typings";
import { GitHubRepo } from "../Components";
import { Masonry } from "@mui/lab";
import axios from "axios";

export class Portfolio extends Component<{}, { repos: GitHub.IRepo[]; }> {
    public constructor() {
        super({});
        this.state = { repos: [] };
    }

    public async componentDidMount(): Promise<void> {
        try {
            const { data: repos }: { data: GitHub.IRepo[]; } = await axios.get("/api/github");
            this.setState({ repos });
        } catch (err) {
            console.error(err);
        }
    }

    public render(): JSX.Element {
        document.title = "Oliver Jones | Portfolio";
        return (
            <Container>
                <Typography component="h1" variant="h2">Portfolio</Typography>
                <Typography component="h2" variant="subtitle1">These projects are pulled directly from my <a href="/github">GitHub</a> profile.</Typography>
                {
                    this.state.repos.length === 0
                        ? <Stack justifyContent="center" alignItems="center">
                            <CircularProgress />
                        </Stack>
                        : <Masonry columns={{ lg: 4, md: 3, xs: 1 }}>
                            {this.state.repos.map((repo, i) => <GitHubRepo repo={repo} index={i} />)}
                        </Masonry>
                }
            </Container>
        );
    }
}