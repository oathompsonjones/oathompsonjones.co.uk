import { Card, Col, Container, Row } from "react-bootstrap";
import React, { Component } from "react";
import MobBr from "../Components/MobBr";

export default class Social extends Component<{}, { email: string | null; firstName: string | null; lastName: string | null; message: string | null; subject: string | null; }> {
    public constructor(props: {}) {
        super(props);
        this.state = { email: null, firstName: null, lastName: null, message: null, subject: null };
    }

    public render(): JSX.Element {
        document.title = "Oliver Jones | Contact";

        return (
            <Container>
                <Row>
                    <Col>
                        <a href="https://twitter.com/oathompsonjones?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-show-count="false">Follow @oathompsonjones</a>
                        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card bg="dark">
                            <Card.Header>
                                <Card.Title>Quick Links</Card.Title>
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
