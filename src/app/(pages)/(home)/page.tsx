"use client";

import { useEffect, useState } from "react";
import { About } from "components/pages/home/about";
import { Background } from "components/pages/home/background";
import { Contact } from "components/pages/home/contact";
import { FadingDiv } from "components/pages/home/fadingDiv";
import { Main } from "components/pages/home/main";
import { ProfilePicture } from "components/pages/home/profilePicture";
import type { ReactNode } from "react";
import { Section } from "components/pages/home/section";
import { useMediaQuery } from "@mui/system";
import { useThemeMode } from "hooks/useThemeMode";
import { useWindowSize } from "hooks/useWindowSize";

/**
 * This is the home page.
 * @returns The home page.
 */
export default function Home(): ReactNode {
    const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
    const { height, width } = useWindowSize();
    const [, forceRerenderState] = useState(0);
    const forceRerender = (): void => forceRerenderState(Math.random());
    const { theme } = useThemeMode();

    const handleScroll = (): void => {
        const fadingDivs = [...document.getElementsByClassName("fadingDiv")] as HTMLDivElement[];

        if (width > theme.breakpoints.values.md) {
            const avatar = document.getElementsByClassName("avatar")[0] as HTMLImageElement | undefined;
            const [pos1, pos2] = [...document.getElementsByClassName("avatarPosition")]
                .map((av) => av.getBoundingClientRect()) as [DOMRect | undefined, DOMRect | undefined];

            const visibleIndex = Math.round(window.scrollY / window.innerHeight);

            // Update the position and size of the avatar
            if (!reducedMotion && avatar !== undefined) {
                avatar.style.left = `${(visibleIndex === 0 ? pos1 : pos2)?.x ?? 0}px`;
                avatar.style.top = `${(visibleIndex === 0 ? pos1 : pos2)?.y ?? 0}px`;
                avatar.style.width = `${(visibleIndex === 0 ? pos1 : pos2)?.width ?? 0}px`;
                avatar.style.height = `${(visibleIndex === 0 ? pos1 : pos2)?.height ?? 0}px`;
            }

            // Update the opacity of the fading divs and the avatar
            fadingDivs.forEach((div, index) => {
                div.style.filter = `opacity(${Number(index === visibleIndex) * 100}%)`;
            });

            if (!reducedMotion && avatar !== undefined)
                avatar.style.filter = `opacity(${Number(visibleIndex > 1) * 100}%)`;
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

    return (
        <>
            <Background />
            {!reducedMotion && <ProfilePicture />}
            <Section>
                <FadingDiv>
                    <Main />
                </FadingDiv>
            </Section>
            <Section>
                <FadingDiv>
                    <About />
                </FadingDiv>
            </Section>
            <Section>
                <Contact />
            </Section>
        </>
    );
}
