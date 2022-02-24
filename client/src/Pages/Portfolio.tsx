import { CardColumns, Col, Container, Row, Spinner } from "react-bootstrap";
import React, { Component } from "react";
import axios, { AxiosResponse } from "axios";
// Import Astro from "../Images/Project Logos/Astro.png";
import { GitHub } from "../../../Typings";
import GitHubRepo from "../Components/GitHubRepo";
// Import Interact from "../Images/Project Logos/Interact.png";
// Import { Link } from "react-router-dom";
// Import NodeJS from "../Images/Project Logos/NodeJS.png";
// Import Project from "../Components/Project";
// Import React1 from "../Images/Project Logos/React.png";

export default class Portfolio extends Component<{}, { repos: GitHub.IRepo[]; }> {
    public constructor() {
        super({});
        this.state = { repos: [] };
    }

    public async componentDidMount(): Promise<void> {
        try {
            const res: AxiosResponse<GitHub.IRepo[]> = await axios.get("/api/github");
            this.setState({ repos: res.data });
        } catch (err) {
            console.error(err);
        }
    }

    public render(): JSX.Element {
        document.title = "Oliver Jones | Portfolio";
        return (
            this.state.repos.length === 0
                ? <Container>
                    <Row>
                        <Col>
                            <Spinner animation="border" variant="primary" />
                        </Col>
                    </Row>
                </Container>
                : <Container>
                    <CardColumns>
                        {this.state.repos.map((repo) => <GitHubRepo repo={repo} />)}
                    </CardColumns>
                </Container>
        );
        /* <Container>
            <CardColumns>
                <Project title="Astro" img={Astro}>
                    Astro is a multi-purpose Discord Bot which I have been working on for a few years, and which I am still constantly updating. <br/>
                    It is designed to be the only bot you could need in a Discord Server, and is made to be easy to operate for any user.<br/>
                    <br/>
                    For more information, go to <a href="https://astrodev.xyz">astrodev.xyz</a> or join the <a href="https://discord.gg/yPjRzZe">Discord Server</a>.
                </Project>
                <Project title="TBSHS Interact Website" img={Interact}>
                    Interact is the the charity and fundraising organisation at <a href="http://tbshs.org">The Bishop's Stortford High School</a>.<br/>
                    I served as the President of Interact during the 2020/21 school year.<br/>
                    <br/>
                    Interact's website is located at <a href="https://tbshs-interact.github.io">tbshs-interact.github.io</a>.
                </Project>
                <Project title="This Website" img={React1}>
                    This website needs little explanation. Read the <Link to="/">Home</Link> page to find out more.
                </Project>
                <Project title="Simple Node Utils" img={NodeJS}>
                    This NPM package is designed to make programmers' lives a little bit easier by providing a collection of useful functions.<br/>
                    These functions generally extend the prototypes of primitive objects in JavaScript, meaning you only need to import the package into your root file. <br/>
                    <br/>
                    For more information, go to <a href="https://github.com/oathompsonjones/simple-node-utils">github.com</a> or <a href="https://www.npmjs.com/package/simple-node-utils">npmjs.com</a>.
                </Project>
            </CardColumns>
        </Container> */
    }
}