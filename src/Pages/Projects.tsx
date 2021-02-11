import { Card, Container, Row } from "react-bootstrap";
import React, { Component } from "react";
import Astro from "../Images/Project Logos/Astro.png";
import Interact from "../Images/Project Logos/Interact.png";
import { Link } from "react-router-dom";
import NodeJS from "../Images/Project Logos/NodeJS.png";
import React1 from "../Images/Project Logos/React.png";

export default class Projects extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones | Projects";
        return (
            <Container style={{ width: "90%" }}>
                <Row className="justify-content-md-center">
                    <Card style={{ width: "24%" }} bg="dark">
                        <Card.Img src={Astro}/>
                        <Card.Body>
                            <Card.Title>Astro</Card.Title>
                            <Card.Text>
                                Astro is a multi-purpose Discord Bot which I have been working on for a few years, and which I am still constantly updating. <br/>
                                It is designed to be the only bot you could need in a Discord Server, and is made to be easy to operate for any user.<br/>
                                <br/>
                                For more information, go to <a href="https://astrodev.xyz">astrodev.xyz</a> or join the <a href="https://discord.gg/yPjRzZe">Discord Server</a>.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "24%" }} bg="dark">
                        <Card.Img src={NodeJS}/>
                        <Card.Body>
                            <Card.Title>Simple Node Utils</Card.Title>
                            <Card.Text>
                                This NPM package is designed to make programmers' lives a little bit easier by providing a collection of useful functions.<br/>
                                These functions generally extend the prototypes of primitive objects in JavaScript, meaning you only need to import the package into your root file. <br/>
                                <br/>
                                For more information, go to <a href="https://github.com/oathompsonjones/simple-node-utils">github.com</a> or <a href="https://www.npmjs.com/package/simple-node-utils">npmjs.com</a>.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "24%" }} bg="dark">
                        <Card.Img src={Interact}/>
                        <Card.Body>
                            <Card.Title>TBSHS Interact Website</Card.Title>
                            <Card.Text>
                                Interact is the the charity and fundraising organisation at <a href="http://tbshs.org">The Bishop's Stortford High School</a>.<br/>
                                I served as the President of Interact during the 2020/21 school year.<br/>
                                <br/>
                                Interact's website is located at <a href="https://tbshsinteract.live">tbshsinteract.live</a>.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "24%" }} bg="dark">
                        <Card.Img src={React1}/>
                        <Card.Body>
                            <Card.Title>This Website</Card.Title>
                            <Card.Text>
                                This website needs litte explanation. Read the <Link to="/">Home</Link> page to find out more.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        );
    }
}