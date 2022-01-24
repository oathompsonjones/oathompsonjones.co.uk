import { Card, CardColumns, Col, Container, Image, Row } from "react-bootstrap";
import React, { Component } from "react";
import Pfp from "../Images/pfp.jpg";

export default class Portfolio extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones | Portfolio";
        return (
            <Container>
                <Row>
                    <Col>
                        <Card bg="dark">
                            <Card.Header>
                                <Card.Title>Biography</Card.Title>
                            </Card.Header>
                            <Card.Body style={{ display: "flex" }}>
                                <Image src={Pfp} alt="Me" style={{
                                    borderRadius: 15,
                                    float: "left",
                                    height: "auto",
                                    maxWidth: "33%"
                                }} />
                                <Card.Text>
                                    <strong>Name:</strong> Oliver Andrew Thompson Jones <br/>
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
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <CardColumns>
                            <Card bg="dark">
                                <Card.Header>
                                    <Card.Title>GCSEs</Card.Title>
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
                                <Card.Footer>
                                    Attained at <a href="https://tbshs.org">The Bishop's Stortford High School</a> in 2019.
                                </Card.Footer>
                            </Card>
                            <Card bg="dark">
                                <Card.Header>
                                    <Card.Title>A-Levels</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        Computer Science - A* <br/>
                                        Further Mathematics - B <br/>
                                        Mathematics - A* <br/>
                                        Physics - A* <br/>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    Attained at <a href="https://tbshs.org">The Bishop's Stortford High School</a> in 2021.
                                </Card.Footer>
                            </Card>
                            <Card bg="dark">
                                <Card.Header>
                                    <Card.Title>Further Education</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        Currently studying Undergraduate Computer Science at the University of Edinburgh.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    Studying at <a href="https://ed.ac.uk">The University of Edinburgh</a> since 2021.
                                </Card.Footer>
                            </Card>
                        </CardColumns>
                    </Col>
                </Row>
            </Container>
        );
    }
}
