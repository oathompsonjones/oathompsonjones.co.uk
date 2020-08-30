import React, { Component } from "react";
import Colours from "../Colours.json";

export default class Header extends Component {
    public render() {
        return (
            <div style={{ backgroundColor: Colours.background[1], bottom: 0, width: "100%", height: 15 }}>
                <p style={{ fontSize: 10, margin: 5 }}>
                    Site created and maintained by Oliver Jones (oathompsonjones) since 2020.
                </p>
            </div>
        );
    }
}
