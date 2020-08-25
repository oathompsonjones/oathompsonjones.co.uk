import React, { Component } from "react";
import Card from "../Components/Card";

export default class Home extends Component {
    public render() {
        document.title = "Oliver Jones";
        return (
            <div id="home">
                <Card heading="Info" text={[
                    "My name is Oliver Jones, and this website is the hub on my online presence.", <br />,
                    "You can find my ", <a href="/portfolio">portfolio</a>, ", my ", <a href="/contact">contact information</a>, " and a collection of some of my ", <a href="/projects">projects</a>, "."
                ]} />
            </div>
        );
    }
}
