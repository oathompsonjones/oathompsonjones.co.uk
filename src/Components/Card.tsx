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
                margin: 50,
                position: "relative"
            }}>
                <div style={{
                    background: Colours.background[2],
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    width: "100%"
                }}><h3>{this.props.heading}</h3></div>
                <div style={{
                    background: Colours.background[1],
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    width: "100%"
                }}>{this.props.text}</div>
            </div>
        );
    }
}
