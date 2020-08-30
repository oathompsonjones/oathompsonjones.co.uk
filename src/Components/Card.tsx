import React, { Component } from "react";
import Colours from "../Colours.json";

export default class Card extends Component {
    constructor(public props: { heading: string; text: JSX.Element; }) {
        super(props);
    }

    public render() {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                margin: "50px",
                position: "relative"
            }}>
                <div style={{
                    background: Colours.background[2],
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    width: "100%"
                }}><h3>{this.props.heading}</h3></div>
                <div style={{
                    background: Colours.background[1],
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                    width: "100%"
                }}>{this.props.text}</div>
            </div>
        );
    }
}
