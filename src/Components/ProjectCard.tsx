import React, { Component, CSSProperties } from "react";
import Card from "./Card";

export default class ProjectCard extends Component {
    constructor(public props: { heading: string; text: Array<string | JSX.Element>; image: string; }) {
        super(props);
        console.log(this.props);
    }

    public render() {
        const projectImageStyle: CSSProperties = {
            float: "left",
            height: "100px",
            padding: "0 10px 10px 0"
        };
        return (
            <div >
                <Card heading={this.props.heading} text={[
                    <div className="project">
                        <img alt={this.props.heading} src={this.props.image} style={projectImageStyle} />
                        <p>{this.props.text}</p>
                    </div>
                ]} />
            </div>
        );
    }
}
