import React, { Component } from "react";
import Card from "../Components/Card";

export default class Portfolio extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones | Portfolio";
        return (
            <div id="portfolio">
                <Card heading="Biography" text={
                    <p>
                        <strong>Name:</strong> Oliver Jones <br />
                        <strong>Username:</strong> oathompsonjones <br />
                        <strong>Nationality:</strong> British <br />
                    </p>
                } />

                <Card heading="Qualifications" text={
                    <div style={!window.matchMedia("(max-width: 700px)").matches
                        // Desktop
                        ? {
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            width: "100%"
                        }
                        // Mobile
                        : {
                            display: "block",
                            justifyContent: "center",
                            width: "100%"
                        }}>
                        <div style={!window.matchMedia("(max-width: 700px)").matches ? { width: "50%" } : { width: "100%" }}>
                            <h3>GCSEs (9-1)</h3>
                            <p>
                                Biology - 8 <br />
                                Chemistry - 7 <br />
                                Computer Science - 8 <br />
                                English Language - 8 <br />
                                English Literature - 7 <br />
                                French - 7 <br />
                                History - 8 <br />
                                Mathematics - 8 <br />
                                Physics - 8 <br />
                            </p>
                        </div>
                        <div style={!window.matchMedia("(max-width: 700px)").matches ? { width: "50%" } : { width: "100%" }}>
                            <div style={{ alignItems: "center", display: "flex" }}>
                                <h3>A-Level Predictions</h3>
                            </div>
                            <p>
                                Computer Science - A* <br />
                                Further Mathematics - A <br />
                                Mathematics - A* <br />
                                Physics - A* <br />
                            </p>
                        </div>
                    </div>
                } />
            </div>
        );
    }
}
