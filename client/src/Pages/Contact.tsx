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
                                <Card.Link href="/email">oathompsonjones@gmail.com</Card.Link><MobBr/>
                                <Card.Link href="/discord">Discord</Card.Link><MobBr/>
                                <Card.Link href="/facebook">Facebook</Card.Link><MobBr/>
                                <Card.Link href="/github">GitHub</Card.Link><MobBr/>
                                <Card.Link href="/instagram">Instagram</Card.Link><MobBr/>
                                <Card.Link href="/linkedin">LinkedIn</Card.Link><MobBr/>
                                <Card.Link href="/twitter">Twitter</Card.Link><MobBr/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
