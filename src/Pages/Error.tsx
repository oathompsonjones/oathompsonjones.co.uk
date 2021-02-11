import React, { Component } from "react";

export default class Error extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones | 404 Error";
        return (
            <div id="404">
                <h1>404 - Page not found.</h1>
                <p>The page you are looking for does not exist.</p>
            </div>
        );
    }
}
