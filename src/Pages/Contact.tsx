import { Card, Container, Row } from "react-bootstrap";
import React, { Component } from "react";
import Colours from "../Colours.json";
import Discord from "../Images/Social Logos/Discord.png";
import Facebook from "../Images/Social Logos/Facebook.png";
import GitHub from "../Images/Social Logos/GitHub.png";
import Instagram from "../Images/Social Logos/Instagram.png";
import LinkedIn from "../Images/Social Logos/LinkedIn.png";
import Twitter from "../Images/Social Logos/Twitter.png";

export default class Social extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones | Contact";
        return (
            <Container style={{ width: "90%" }}>
                <Row className="justify-content-md-center">
                    <Card bg="dark">
                        <Card.Body>
                            <Card.Title>Social Links</Card.Title>
                            <Card.Text>
                                <div id="contact-links" style={{ textAlign: "center" }}>
                                    <p>
                                        <a href="mailto:oathompsonjones@gmail.com">oathompsonjones@gmail.com</a><br/>
                                        <a href="https://discord.com/users/310145094684639235">Discord</a><br/>
                                        <a href="https://facebook.com/oathompsonjones">Facebook</a><br/>
                                        <a href="https://github.com/oathompsonjones">GitHub</a><br/>
                                        <a href="https://instagram.com/oathompsonjones">Instagram</a><br/>
                                        <a href="https://linkedin.com/in/oathompsonjones">LinkedIn</a><br/>
                                        <a href="https://twitter.com/oathompsonjones">Twitter</a><br/>
                                    </p>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "15%" }} bg="dark">
                        <Card.Img src={Discord} style={{ backgroundColor: Colours.social.discord }}/>
                        <Card.Body>
                            <Card.Title><a href="https://discord.com/users/310145094684639235">Discord</a></Card.Title>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "15%" }} bg="dark">
                        <Card.Img src={Facebook} style={{ backgroundColor: Colours.social.facebook }}/>
                        <Card.Body>
                            <Card.Title><a href="https://facebook.com/oathompsonjones">Facebook</a></Card.Title>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "15%" }} bg="dark">
                        <Card.Img src={GitHub} style={{ backgroundColor: Colours.social.github }}/>
                        <Card.Body>
                            <Card.Title><a href="https://github.com/oathompsonjones">GitHub</a></Card.Title>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "15%" }} bg="dark">
                        <Card.Img src={Instagram} style={{ backgroundColor: Colours.social.instagram }}/>
                        <Card.Body>
                            <Card.Title><a href="https://instagram.com/oathompsonjones">Instagram</a></Card.Title>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "15%" }} bg="dark">
                        <Card.Img src={LinkedIn} style={{ backgroundColor: Colours.social.linkedin }}/>
                        <Card.Body>
                            <Card.Title><a href="https://linkedin.com/in/oathompsonjones">LinkedIn</a></Card.Title>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "15%" }} bg="dark">
                        <Card.Img src={Twitter} style={{ backgroundColor: Colours.social.twitter }}/>
                        <Card.Body>
                            <Card.Title><a href="https://twitter.com/oathompsonjones">Twitter</a></Card.Title>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        );
    }
}
