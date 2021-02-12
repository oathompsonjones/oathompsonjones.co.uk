import { Badge, Card, Container, Row } from "react-bootstrap";
import React, { Component } from "react";

export default class Portfolio extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones | Portfolio";
        return (
            <Container style={{ width: "90%" }}>
                <Row className="justify-content-md-center">
                    <Card bg="dark">
                        <Card.Body>
                            <Card.Title>Biography</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> Oliver Jones <br/>
                                <strong>Username:</strong> oathompsonjones <br/>
                                <strong>Nationality:</strong> British <br/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
                <Row className="justify-content-md-center">
                    <Card style={!window.matchMedia("(max-width: 700px)").matches ? { width: "49%" } : { width: "100%" }} bg="dark">
                        <Card.Body>
                            <Card.Title>GCSEs (9-1)</Card.Title>
                            <Card.Text>
                                Biology - 8 <br/>
                                Chemistry - 7 <br/>
                                Computer Science - 8 <br/>
                                English Language - 8 <br/>
                                English Literature - 7 <br/>
                                French - 7 <br/>
                                History - 8 <br/>
                                Mathematics - 8 <br/>
                                Physics - 8 <br/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={!window.matchMedia("(max-width: 700px)").matches ? { width: "49%" } : { width: "100%" }} bg="dark">
                        <Card.Body>
                            <Card.Title>A-Levels <Badge pill variant="primary">Predicted</Badge></Card.Title>
                            <Card.Text>
                                Computer Science - A* <br/>
                                Further Mathematics - A <br/>
                                Mathematics - A* <br/>
                                Physics - A* <br/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        );
    }
}
