"use client";

import type { ReactElement } from "react";
import Section from "./section";
import { useEffect } from "react";
import ProfilePicture from "./profilePicture";
import Main from "./main";
import About from "./about";
import Background from "./background";
import FadingDiv from "./fadingDiv";
import useWindowSize from "hooks/useWindowSize";
import Mobile from "components/mobile";
import Contact from "./contact";

/**
 * This is the home page.
 * @returns The home page.
 */
export default function Home(): ReactElement {
    const { height, width } = useWindowSize();

    function handleScroll(): void {
        if (window.innerWidth >= 900){
            const sectionCount = [...document.querySelectorAll("section")].length;
            const fadingDivs = [...document.getElementsByClassName("fadingDiv")] as [HTMLDivElement, HTMLDivElement];
            const avatar = document.getElementsByClassName("avatar")[0] as HTMLElement;
            const [pos1, pos2] = [...document.getElementsByClassName("avatarPosition")]
                .map((avatar) => avatar.getBoundingClientRect()) as [DOMRect, DOMRect];

            const scrollPercentage = window.scrollY / window.innerHeight * 100 / sectionCount;
            const visibleIndex = Math.round(scrollPercentage / (100 / sectionCount));

            // Update the position and size of the avatar
            avatar.style.left = `${(visibleIndex === 0 ? pos1 : pos2)?.x ?? 0}px`;
            avatar.style.top = `${(visibleIndex === 0 ? pos1 : pos2)?.y ?? 0}px`;
            avatar.style.width = `${(visibleIndex === 0 ? pos1 : pos2)?.width ?? 0}px`;
            avatar.style.height = `${(visibleIndex === 0 ? pos1 : pos2)?.height ?? 0}px`;

            // Update the opacity of the fading divs and the avatar
            fadingDivs.forEach((div, index) => div.style.filter = `opacity(${index === visibleIndex ? 100 : 0}%)`);
            avatar.style.filter = `opacity(${visibleIndex > 1 ? 0 : 100}%)`;
        }
    }

    useEffect(() => {
        /* const fadingDivs = [...document.getElementsByClassName("fadingDiv")] as [HTMLDivElement, HTMLDivElement];
        const avatar = document.getElementsByClassName("avatar")[0] as HTMLElement;
        const [pos1] = [...document.getElementsByClassName("avatarPosition")]
            .map((avatar) => avatar.getBoundingClientRect()) as [DOMRect, DOMRect];

        if (window.innerWidth >= 900) {
            // Set initial position and size
            avatar.style.left = `${pos1.x}px`;
            avatar.style.top = `${pos1.y}px`;
            avatar.style.width = `${pos1.width}px`;
            avatar.style.height = `${pos1.height}px`;

            // Set initial opacity
            fadingDivs[0].style.filter = "opacity(100%)";
            fadingDivs[1].style.filter = "opacity(0%)";
        } else {
            // Set initial opacity
            fadingDivs.forEach((div) => div.style.filter = "opacity(100%)");
        } */

        window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [height, width]);

    const mobileSpacer = (
        <>
            <Mobile><br /><br /></Mobile>
            <Mobile><br /><br /></Mobile>
        </>
    );

    return (
        <>
            <Background />
            <ProfilePicture />
            <Section>
                <FadingDiv>
                    <Main />
                </FadingDiv>
            </Section>
            {mobileSpacer}
            <Section>
                <FadingDiv>
                    <About />
                </FadingDiv>
            </Section>
            {mobileSpacer}
            <Section>
                <Contact />
            </Section>
        </>
    );
}
