import { CircularProgress, Container, Stack } from "@mui/material";
import React, { Component } from "react";
import { GitHub } from "../../../Typings";
import GitHubRepo from "../Components/GitHubRepo";
import { Masonry } from "@mui/lab";
import axios from "axios";

export default class Portfolio extends Component<{}, { repos: GitHub.IRepo[]; }> {
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
                {
                    this.state.repos.length === 0
                        ? <Stack justifyContent="center" alignItems="center">
                            <CircularProgress />
                        </Stack>
                        : <Masonry>
                            {this.state.repos.map((repo) => <GitHubRepo repo={repo} />)}
                        </Masonry>
                }
            </Container>
        );
    }
}