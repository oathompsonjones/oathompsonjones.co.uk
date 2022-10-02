import React, { Component } from "react";
import { Typography } from "@mui/material";

export class Footer extends Component {
    public render(): JSX.Element {
        return (
            <footer style={{ bottom: 0, height: "1vh", margin: "0% 1%", position: "absolute" }}>
                <Typography component="p" variant="caption">Website created by <a href="https://oathompsonjones.co.uk">Oliver Jones</a>.</Typography>
            </footer>
        );
    }
}