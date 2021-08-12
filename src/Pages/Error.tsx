import React, { Component } from "react";
import { Container } from "react-bootstrap";

export default class Error extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones | 404 Error";
        return (
            <Container>
                <h1>404 - Page not found.</h1>
                <p>The page you are looking for does not exist.</p>
            </Container>
        );
    }
}
