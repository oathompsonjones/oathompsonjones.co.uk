import React, { Component, CSSProperties } from "react";
import Colours from "../Colours.json";

export default class Card extends Component {
    constructor(public props: { heading: string; text: Array<string | JSX.Element>; }) {
        super(props);
        console.log(this.props);
    }

    public render() {
        const cardStyle: CSSProperties = {
            display: "flex",
            flexDirection: "column",
            margin: "50px",
            position: "relative"
        };
        const cardHeaderStyle: CSSProperties = {
            background: Colours.background.tertiary,
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            width: "100%"
        };
        const cardBodyStyle: CSSProperties = {
            background: Colours.background.secondary,
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
            width: "100%"
        };

        return (
            <div style={cardStyle}>
                <div style={cardHeaderStyle}><h3>{this.props.heading}</h3></div>
                <div style={cardBodyStyle}><p>{this.props.text}</p></div>
            </div>
        );
    }
}
