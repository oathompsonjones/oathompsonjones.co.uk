import React, { Component } from "react";
import Card from "../Components/Card";

export default class Portfolio extends Component {
    public render() {
        document.title = "Oliver Jones | Portfolio";
        return (
            <div id="portfolio">
                <Card heading="Biography" text={
                    <p>
                        My name is Oliver Jones. My online username is oathompsonjones. <br />
                        I am a British student, currently studying Maths, Further Maths, Physics and Computer Science at A Level. <br />
                        I spend a majority of my free time programming my Discord bot - <a href="https://astrodev.xyz">Astro</a> and doing other programming projects such as making this site.
                        <br /> <br />
                        When I'm not sat infront of a computer screen, I am often kept busy as the President of my school's chairity orgainsation called <a href="https://tbshsinteract.live">Interact</a>. <br />
                        Raising money and awareness for good causes is very important to me, and is something I will continue to do even after my term as Interact President has ended.
                        <br /> <br />
                        Reading this, you might get the impression that I'm not a particularly sporty person. This assumption would be correct. However, I will never pass up the opportunity to go skiing, something I've been doing for as long as I can remember, and thoroughly enjoy. You can view the <a href="/#/gallery">gallery</a> section to see some of my holidays in the mountains.
                    </p>
                } />

                <Card heading="Qualifications" text={
                    <div style={!window.matchMedia("max-width: 700px").matches
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
                        <div style={!window.matchMedia("max-width: 700px").matches ? { width: "50%" } : { width: "100%" }}>
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
                        <div style={!window.matchMedia("max-width: 700px").matches ? { width: "50%" } : { width: "100%" }}>
                            <h3>A-Levels</h3>
                            <p>
                                Computer Science - TBC <br />
                                Further Mathematics - TBC <br />
                                Mathematics - TBC <br />
                                Physics - TBC <br />
                            </p>
                        </div>
                    </div>
                } />
            </div>
        );
    }
}
