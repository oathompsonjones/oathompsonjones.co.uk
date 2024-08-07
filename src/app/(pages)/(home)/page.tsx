"use client";

import ContactPage from "pages/contact/page";
import type { ReactElement } from "react";
import Section from "./section";
import { useEffect } from "react";
import ProfilePicture from "./profilePicture";
import Main from "./main";
import About from "./about";
import Background from "./background";

/**
 * This is the home page.
 * @returns The home page.
 */
export default function Home(): ReactElement {
    function handleScroll(
        sectionCount: number,
        avatar: HTMLElement,
        fadingDivs: [HTMLDivElement, HTMLDivElement],
        pos1: DOMRect,
        pos2: DOMRect,
    ): void {
        const scrollPercentage = window.scrollY / window.innerHeight * 100 / sectionCount;
        const visibleIndex = Math.round(scrollPercentage / (100 / sectionCount));

        // Update the position and size of the avatar
        avatar.style.left = `${(visibleIndex === 0 ? pos1 : pos2).x}px`;
        avatar.style.top = `${(visibleIndex === 0 ? pos1 : pos2).y}px`;
        avatar.style.width = `${(visibleIndex === 0 ? pos1 : pos2).width}px`;
        avatar.style.height = `${(visibleIndex === 0 ? pos1 : pos2).height}px`;

        // Update the opacity of the fading divs and the avatar
        fadingDivs.forEach((div, index) => div.style.filter = `opacity(${index === visibleIndex ? 100 : 0}%)`);
        avatar.style.filter = `opacity(${visibleIndex > 1 ? 0 : 100}%)`;
    }

    useEffect(() => {
        const sectionCount = [...document.querySelectorAll("section")].length;
        const fadingDivs = [...document.getElementsByClassName("fadingDiv")] as [HTMLDivElement, HTMLDivElement];
        const avatar = document.getElementsByClassName("avatar")[0] as HTMLElement;
        const [pos1, pos2] = [...document.getElementsByClassName("avatarPosition")]
            .map((avatar) => avatar.getBoundingClientRect()) as [DOMRect, DOMRect];
        
        // Set initial position and size
        avatar.style.left = `${pos1.x}px`;
        avatar.style.top = `${pos1.y}px`;
        avatar.style.width = `${pos1.width}px`;
        avatar.style.height = `${pos1.height}px`;

        // Set initial opacity
        fadingDivs[0].style.filter = "opacity(100%)";
        fadingDivs[1].style.filter = "opacity(0%)";

        window.addEventListener("scroll", handleScroll.bind(null, sectionCount, avatar, fadingDivs, pos1, pos2));
    }, []);

    return (
        <>
            <Background />
            <ProfilePicture />
            <Section><Main /></Section>
            <Section><About /></Section>
            <Section><ContactPage /></Section>
        </>
    );
}
