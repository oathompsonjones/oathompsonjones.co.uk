import { Accordion, Card, Col, Container, Row } from "react-bootstrap";
import React, { Component } from "react";
import { GitHub } from "../../../Typings";

export default class GitHubRepo extends Component<{ repo: GitHub.IRepo; }> {
    public constructor(public readonly props: { repo: GitHub.IRepo; }) {
        super(props);
    }

    public render(): JSX.Element {
        const { repo } = this.props;
        return <Accordion>
            <Card bg="dark">
                <Card.Img src={repo.image}/>
                <Card.Header>
                    <Card.Title>
                        {repo.name}
                    </Card.Title>
                </Card.Header>
                <Accordion.Toggle as={Card.Footer} className="text-muted" eventKey="0" style={{ cursor: "pointer" }}>
                    Learn more
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Card.Text>
                            {repo.nameWithOwner.split("/")[0] !== "oathompsonjones" ? <><strong>Team:</strong> {repo.nameWithOwner.split("/")[0]} <br/></> : ""}
                            <strong>Languages:</strong> {`${repo.primaryLanguage.name} ${((languages: string[]): string => languages.length > 0 ? `(${languages.join(", ")})` : "")(repo.languages.nodes.map((lang) => lang.name).filter((name) => name !== repo.primaryLanguage.name))}`}<br/>
                            <Container>
                                <Row>
                                    <Col>
                                        {!repo.isPrivate ? <a href={repo.url}>View Code</a> : <a className="text-muted" aria-disabled>View Code</a>}
                                    </Col>
                                    <Col>
                                        {repo.homepageUrl !== null && repo.homepageUrl.length > 0 ? <a href={repo.homepageUrl}>View Site</a> : <a className="text-muted" aria-disabled>View Site</a>}
                                    </Col>
                                </Row>
                            </Container>
                            <br/>
                            {repo.description}
                        </Card.Text>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>;
    }
}