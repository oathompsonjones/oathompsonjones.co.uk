import { Card, Container, Row } from "react-bootstrap";
import React, { Component } from "react";

export default class Social extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones | Contact";
        return (
            <Container style={{ width: "90%" }}>
                <Row className="justify-content-md-center">
                    <Card bg="dark">
                        <Card.Header>
                            <Card.Title>Contact Information</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Link href="mailto:oathompsonjones@gmail.com">oathompsonjones@gmail.com</Card.Link>
                            <Card.Link href="https://discord.com/users/310145094684639235">Discord</Card.Link>
                            <Card.Link href="https://facebook.com/oathompsonjones">Facebook</Card.Link>
                            <Card.Link href="https://github.com/oathompsonjones">GitHub</Card.Link>
                            <Card.Link href="https://instagram.com/oathompsonjones">Instagram</Card.Link>
                            <Card.Link href="https://linkedin.com/in/oathompsonjones">LinkedIn</Card.Link>
                            <Card.Link href="https://twitter.com/oathompsonjones">Twitter</Card.Link>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        );
    }
}
