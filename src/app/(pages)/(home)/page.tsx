"use client";

import { useEffect, useState } from "react";
import { About } from "components/pages/home/about";
import { Background } from "components/pages/home/background";
import { Contact } from "components/pages/home/contact";
import { FadingDiv } from "components/pages/home/fadingDiv";
import { Main } from "components/pages/home/main";
import { Mobile } from "components/mobile";
import { ProfilePicture } from "components/pages/home/profilePicture";
import type { ReactNode } from "react";
import { Section } from "components/pages/home/section";
import { useWindowSize } from "hooks/useWindowSize";

/**
 * This is the home page.
 * @returns The home page.
 */
export default function Home(): ReactNode {
    const { height, width } = useWindowSize();
    const [, forceRerenderState] = useState(0);
    const forceRerender = (): void => forceRerenderState(Math.random());

    const handleScroll = (): void => {
        const fadingDivs = [...document.getElementsByClassName("fadingDiv")] as HTMLDivElement[];

        if (window.innerWidth >= 900) {
            const avatar = document.getElementsByClassName("avatar")[0] as HTMLImageElement | undefined;
            const [pos1, pos2] = [...document.getElementsByClassName("avatarPosition")]
                .map((av) => av.getBoundingClientRect()) as [DOMRect | undefined, DOMRect | undefined];

            const visibleIndex = Math.round(window.scrollY / window.innerHeight);

            // Update the position and size of the avatar
            if (avatar !== undefined) {
                avatar.style.left = `${(visibleIndex === 0 ? pos1 : pos2)?.x ?? 0}px`;
                avatar.style.top = `${(visibleIndex === 0 ? pos1 : pos2)?.y ?? 0}px`;
                avatar.style.width = `${(visibleIndex === 0 ? pos1 : pos2)?.width ?? 0}px`;
                avatar.style.height = `${(visibleIndex === 0 ? pos1 : pos2)?.height ?? 0}px`;
            }

            // Update the opacity of the fading divs and the avatar
            fadingDivs.forEach((div, index) => {
                div.style.filter = `opacity(${Number(index === visibleIndex) * 100}%)`;
            });

            if (avatar !== undefined)
                avatar.style.filter = `opacity(${visibleIndex > 1 ? 0 : 100}%)`;
        } else {
            fadingDivs.forEach((div) => {
                div.style.filter = "opacity(100%)";
            });
        }
    };

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

    const mobileSpacer = (<Mobile>{Array(4).fill(0).map((_, i) => (<br key={i} />))}</Mobile>);

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
