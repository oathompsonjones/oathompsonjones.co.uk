import { CardColumns, Col, Container, Row, Spinner } from "react-bootstrap";
import React, { Component } from "react";
import { GitHub } from "../../../Typings";
import GitHubRepo from "../Components/GitHubRepo";
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
        return this.state.repos.length === 0
            ? <Container>
                <Row>
                    <Col>
                        <Spinner animation="border" variant="primary" />
                    </Col>
                </Row>
            </Container>
            : <Container>
                <CardColumns>
                    {this.state.repos.map((repo) => <GitHubRepo repo={repo} />)}
                </CardColumns>
            </Container>;
    }
}