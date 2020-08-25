import React, { Component } from "react";
import Card from "../Components/Card";

export default class Social extends Component {
    public render() {
        document.title = "Oliver Jones | Contact";
        return (
            <div id="contact">
                <Card heading="Contact Links" text={[
                    "I am available on many platforms, so feel free to contact me via any of those listed below.", <br />,
                    <br />,
                    <div id="contact-links">
                        <a href="mailto:oathompsonjones@gmail.com">oathompsonjones@gmail.com</a><br />
                        <a href="https://discord.com/users/310145094684639235">Discord</a><br />
                        <a href="https://twitter.com/oathompsonjones">Twitter</a> <br />
                        <a href="https://facebook.com/oathompsonjones">Facebook</a> <br />
                        <a href="https://instagram.com/oathompsonjones">Instagram</a> <br />
                        <a href="https://github.com/oathompsonjones">GitHub</a> <br />
                        <a href="https://linkedin.com/in/oathompsonjones">LinkedIn</a> <br />
                    </div>
                ]} />
            </div>
        );
    }
}
