import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../Components/Card";
import Astro from "../Images/Project Logos/Astro.png";
import NodeJS from "../Images/Project Logos/NodeJS.png";
import Interact from "../Images/Project Logos/Interact.png";
import React1 from "../Images/Project Logos/React.png";

export default class Projects extends Component {
    public render() {
        document.title = "Oliver Jones | Projects";
        return (
            <div>
                <ProjectCard heading="Astro" text={
                    <p>
                        Astro is a multi-purpose Discord Bot which I have been working on for a few years, and which I am still constantly updating. <br />
                        It is designed to be the only bot you could need in a Discord Server, and is made to be easy to operate for any user.<br />
                        <br />
                        For more information, go to <a href="https://astrodev.xyz">astrodev.xyz</a> or join the <a href="https://discord.gg/yPjRzZe">Discord Server</a>.
                    </p>
                } image={Astro} />
                <ProjectCard heading="Simple Node Utils" text={
                    <p>
                        This NPM package is designed to make programmers' lives a little bit easier by providing a collection of useful functions.<br />
                        These functions generally extend the prototypes of primitive objects in JavaScript, meaning you only need to import the package into your root file. <br />
                        <br />
                        For more information, go to <a href="https://github.com/oathompsonjones/simple-node-utils">github.com</a> or <a href="https://www.npmjs.com/package/simple-node-utils">npmjs.com</a>.
                    </p>
                } image={NodeJS} />
                <ProjectCard heading="TBSHS Interact Website" text={
                    <p>
                        Interact is the the charity and fundraising organisation at <a href="http://tbshs.org">The Bishop's Stortford High School</a>.<br />
                        I served as the President of Interact during 2020 and the beginning of 2021.<br />
                        <br />
                        Interact's website is located at <a href="https://tbshsinteract.live">tbshsinteract.live</a>.
                    </p>
                } image={Interact} />
                <ProjectCard heading="This Website" text={
                    <p>
                        This website needs litte explanation. Read the <Link to="/">Home</Link> page to find out more.
                    </p>
                } image={React1} />
            </div>
        );
    }
}


class ProjectCard extends Component {
    constructor(public props: { heading: string; text: JSX.Element; image: string; }) {
        super(props);
    }

    public render() {
        console.log(!window.matchMedia("(max-width: 700px)").matches)
        return (
            <div >
                <Card heading={this.props.heading} text={
                    <div>
                        <img alt={this.props.heading} src={this.props.image} style={!window.matchMedia("(max-width: 700px)").matches
                            ? {
                                float: "left",
                                height: 100,
                                margin: 10,
                                display: "block"
                            } : {
                                width: "75%",
                                height: "auto",
                                margin: "auto",
                                padding: 10,
                                display: "block"
                            }} />
                        {this.props.text}
                    </div>
                } />
            </div>
        );
    }
}
