import { Container, Typography } from "@mui/material";
import React, { Component } from "react";

export default class Error extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones | 404 Error";
        return (
            <Container>
                <Typography component="h1" variant="h1" gutterBottom>404 - Page not found.</Typography>
                <Typography component="p" variant="body1" gutterBottom>The page you are looking for does not exist.</Typography>
            </Container>
        );
    }
}
