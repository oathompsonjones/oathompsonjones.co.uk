import React, { Component } from "react";
import { Typography } from "@mui/material";

export class Footer extends Component<{ footerHeight: string; }> {
    public constructor(public readonly props: { footerHeight: string; }) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <footer style={{ bottom: 0, height: this.props.footerHeight, margin: "0% 1%", position: "absolute" }}>
                <Typography component="p" variant="caption">Website created by <a href="https://oathompsonjones.co.uk">Oliver Jones</a>.</Typography>
            </footer>
        );
    }
}