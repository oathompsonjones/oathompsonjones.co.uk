import { Card, Col, Container, Row } from "react-bootstrap";
import React, { Component } from "react";
import MobBr from "../Components/MobBr";

export default class Social extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones | Contact";
        return (
            <Container>
                <Row>
                    <Col>
                        <Card bg="dark">
                            <Card.Header>
                                <Card.Title>Contact Information</Card.Title>
                            </Card.Header>
                            <Card.Body style={{ textAlign: "center" }}>
                                <Card.Link href="mailto:oathompsonjones@gmail.com">oathompsonjones@gmail.com</Card.Link><MobBr/>
                                <Card.Link href="https://discord.com/users/310145094684639235">Discord</Card.Link><MobBr/>
                                <Card.Link href="https://facebook.com/oathompsonjones">Facebook</Card.Link><MobBr/>
                                <Card.Link href="https://github.com/oathompsonjones">GitHub</Card.Link><MobBr/>
                                <Card.Link href="https://instagram.com/oathompsonjones">Instagram</Card.Link><MobBr/>
                                <Card.Link href="https://linkedin.com/in/oathompsonjones">LinkedIn</Card.Link><MobBr/>
                                <Card.Link href="https://twitter.com/oathompsonjones">Twitter</Card.Link><MobBr/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
