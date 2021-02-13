import { Badge, Card, CardDeck, Container, Row } from "react-bootstrap";
import React, { Component } from "react";

export default class Portfolio extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones | Portfolio";
        return (
            <Container style={{ width: "90%" }}>
                <Row className="justify-content-md-center">
                    <Card style={{ width: "100%" }} bg="dark">
                        <Card.Header>
                            <Card.Title>Biography</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <strong>Name:</strong> Oliver Jones <br/>
                                <strong>Username:</strong> oathompsonjones <br/>
                                <strong>Nationality:</strong> British <br />
                                <strong>Age:</strong> {((): number => {
                                    const today: Date = new Date();
                                    const birthDate: Date = new Date(2003, 0, 2);
                                    return today.getMonth() - birthDate.getMonth() <= 0 && today.getDate() < birthDate.getDate()
                                        ? today.getFullYear() - birthDate.getFullYear() - 1
                                        : today.getFullYear() - birthDate.getFullYear();
                                })()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
                <br/>
                <Row className="justify-content-md-center">
                    <CardDeck style={{ width: "100%" }}>
                        <Card bg="dark">
                            <Card.Header>
                                <Card.Title>GCSEs (9-1)</Card.Title>
                            </Card.Header>
                            <Card.Body>
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
                        <Card bg="dark">
                            <Card.Header>
                                <Card.Title>A-Levels <Badge pill variant="primary">Predicted</Badge></Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                Computer Science - A* <br/>
                                Further Mathematics - A <br/>
                                Mathematics - A* <br/>
                                Physics - A* <br/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </Row>
            </Container>
        );
    }
}
