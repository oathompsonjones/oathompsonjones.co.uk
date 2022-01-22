import { CardColumns, Container } from "react-bootstrap";
import React, { Component } from "react";
import Astro from "../Images/Project Logos/Astro.png";
import Interact from "../Images/Project Logos/Interact.png";
import { Link } from "react-router-dom";
import NodeJS from "../Images/Project Logos/NodeJS.png";
import Project from "../Components/Project";
import React1 from "../Images/Project Logos/React.png";

export default class Projects extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones | Projects";
        return (
            <Container>
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
            </Container>
        );
    }
}