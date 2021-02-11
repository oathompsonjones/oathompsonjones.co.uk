import { Card, Container, Row } from "react-bootstrap";
import React, { Component } from "react";

export default class Home extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones";
        return (
            <Container fluid style={{ width: "90%" }}>
                <Row className="justify-content-md-center">
                    <Card bg="dark">
                        <Card.Body>
                            <Card.Title>Info</Card.Title>
                            <Card.Text>
                                My name is Oliver Jones, and this website is the hub on my online presence. <br/>
                                You can find my <a href="/#/portfolio">portfolio</a>, my <a href="/#/contact">contact information</a>, and a collection of some of my <a href="/#/projects">projects</a>.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        );
    }
}
