import React, { Component } from "react";
import Card from "./Card";

export default class ProjectCard extends Component {
    constructor(public props: { heading: string; text: JSX.Element; image: string; }) {
        super(props);
    }

    public render() {
        return (
            <div >
                <Card heading={this.props.heading} text={
                    <div className="project">
                        <img alt={this.props.heading} src={this.props.image} style={{
                            float: "left",
                            height: "100px",
                            padding: "0 10px 10px 0"
                        }} />
                        <p>{this.props.text}</p>
                    </div>
                } />
            </div>
        );
    }
}
