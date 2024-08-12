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
        const fadingDivs = [...document.getElementsByClassName("fadingDiv")] as [HTMLDivElement, HTMLDivElement];
        if (window.innerWidth >= 900) {
            const sectionCount = [...document.querySelectorAll("section")].length;
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
            console.log({ w1: pos1?.width, h1: pos1?.height, w2: pos2?.width, h2: pos2?.height });

            // Update the opacity of the fading divs and the avatar
            fadingDivs.forEach((div, index) => div.style.filter = `opacity(${index === visibleIndex ? 100 : 0}%)`);
            avatar.style.filter = `opacity(${visibleIndex > 1 ? 0 : 100}%)`;
        } else {
            fadingDivs.forEach((div) => div.style.filter = "opacity(100%)");
        }
    }

    // Add event listener for scrolling
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Update the avatar and fading divs on window resize
    useEffect(handleScroll, [height, width]);

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
