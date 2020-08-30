import React, { Component } from "react";
import ProjectCard from "../Components/ProjectCard";
import Astro from "../Images/Project Logos/Astro.png";

export default class Projects extends Component {
    public render() {
        document.title = "Oliver Jones | Projects";
        return (
            <div id="projects">
                <ProjectCard heading="Astro" text={
                    <p>
                        Astro is a multi-purpose Discord Bot.
                        Astro is a project which I have been working on for a few years, and which I am still constantly updating. <br /> <br />
                        For more information, go to < a href="https://astrodev.xyz" > astrodev.xyz</a> or join the <a href="https://discord.gg/yPjRzZe">Discord Server</a>.
                    </p>
                } image={Astro} />
            </div>
        );
    }
}
