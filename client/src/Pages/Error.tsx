import { Container, Typography } from "@mui/material";
import { Component } from "react";

export class Error extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones | 404 Error";
        return (
            <Container>
                <Typography variant="h2" gutterBottom>Error 404 - Page not found.</Typography>
                <Typography variant="subtitle1">These aren't the droids you're looking for.</Typography>
            </Container>
        );
    }
}
