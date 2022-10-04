import { Component } from "react";
import { Typography } from "@mui/material";

export class Footer extends Component<{ footerHeight: string; }> {
    public constructor(public readonly props: { footerHeight: string; }) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <footer style={{
                bottom: 0,
                height: this.props.footerHeight,
                padding: "0% 1%",
                position: "absolute",
                width: "100%"
            }}>
                <Typography component="p" variant="caption">Website created by <a href="https://oathompsonjones.co.uk">Oliver Jones</a>.</Typography>
            </footer>
        );
    }
}