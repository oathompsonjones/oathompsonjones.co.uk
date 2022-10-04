import { Container, Typography } from "@mui/material";
import { Component } from "react";

export class Error extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones | 404 Error";
        return (
            <Container>
                <Typography component="h1" variant="h1" gutterBottom>Error 404 - Page not found.</Typography>
                <Typography component="h2" variant="subtitle1">The page you are looking for does not exist.</Typography>
            </Container>
        );
    }
}
