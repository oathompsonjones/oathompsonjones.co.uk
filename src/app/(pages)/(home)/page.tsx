"use client";

import { useEffect, useState } from "react";
import { About } from "./about";
import { Background } from "./background";
import { Contact } from "./contact";
import { FadingDiv } from "./fadingDiv";
import { Main } from "./main";
import { Mobile } from "components/mobile";
import { ProfilePicture } from "./profilePicture";
import type { ReactElement } from "react";
import { Section } from "./section";
import { useWindowSize } from "hooks/useWindowSize";

/**
 * This is the home page.
 * @returns The home page.
 */
export default function Home(): ReactElement {
    const { height, width } = useWindowSize();
    const [, forceRerenderState] = useState(0);
    const forceRerender = (): void => forceRerenderState(Math.random());

    function handleScroll(): void {
        const fadingDivs = [...document.getElementsByClassName("fadingDiv")] as [HTMLDivElement, HTMLDivElement];

        if (window.innerWidth >= 900) {
            const avatar = document.getElementsByClassName("avatar")[0] as HTMLElement;
            const [pos1, pos2] = [...document.getElementsByClassName("avatarPosition")]
                .map((av) => av.getBoundingClientRect()) as [DOMRect, DOMRect];

            const visibleIndex = Math.round(window.scrollY / window.innerHeight);

            // Update the position and size of the avatar
            avatar.style.left = `${(visibleIndex === 0 ? pos1 : pos2).x}px`;
            avatar.style.top = `${(visibleIndex === 0 ? pos1 : pos2).y}px`;
            avatar.style.width = `${(visibleIndex === 0 ? pos1 : pos2).width}px`;
            avatar.style.height = `${(visibleIndex === 0 ? pos1 : pos2).height}px`;

            // Update the opacity of the fading divs and the avatar
            fadingDivs.forEach((div, index) => {
                div.style.filter = `opacity(${Number(index === visibleIndex) * 100}%)`;
            });
            avatar.style.filter = `opacity(${visibleIndex > 1 ? 0 : 100}%)`;
        } else {
            fadingDivs.forEach((div) => {
                div.style.filter = "opacity(100%)";
            });
        }
    }

    // Add event listener for scrolling
    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll, { capture: true, passive: true });

        return (): void => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Update the avatar and fading divs on window resize
    useEffect(() => {
        handleScroll();
        forceRerender();
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
