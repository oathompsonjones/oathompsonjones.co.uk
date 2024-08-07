"use client";

import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { age } from "utils";
import ContactPage from "pages/contact/page";
import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import Section from "./section";
import desk from "images/desk.jpg";
import { useEffect } from "react";
import FadingDiv from "./fadingDiv";
import ProfilePicture from "./profilePicture";

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
            {/* Background */}
            <Box zIndex={-5} position="fixed">
                <Image
                    alt="Picture of a computer desk."
                    src={desk}
                    style={{ filter: "brightness(50%) opacity(90%)", position: "fixed" }}
                    fill
                />
            </Box>
            {/* Scrolling animation avatar */}
            <ProfilePicture />
            {/* Home */}
            <Section>
                <FadingDiv>
                    <Stack alignItems="center" direction="column" justifyContent="center">
                        <ProfilePicture positioner />
                        <Typography align="center" variant="h1">Oliver Jones</Typography>
                        <Typography align="center" variant="h3" color="secondary">BSc Computer Science Undergraduate</Typography>
                        <Typography align="center" variant="h4" color="secondary">The University of Edinburgh</Typography>
                    </Stack>
                    <Divider flexItem sx={{ bgcolor: "primary.main", m: "1%" }} />
                    <Stack
                        alignItems="center"
                        direction={{ sm: "row", xs: "column" }}
                        justifyContent="space-evenly"
                        spacing="1%"
                        sx={{ width: "100%" }}
                    >
                        <Button LinkComponent={Link} href="/about" size="large">About Me</Button>
                        <Button LinkComponent="a" href="/api/cv" size="large">Download CV</Button>
                        <Button LinkComponent={Link} href="/contact" size="large">Contact Me</Button>
                    </Stack>
                    <Divider flexItem sx={{ bgcolor: "primary.main", m: "1%" }} />
                </FadingDiv>
            </Section>
            {/* About */}
            <Section>
                <FadingDiv>
                    <Stack alignItems="center" direction={{ md: "row-reverse" }} spacing="2rem">
                        <ProfilePicture positioner />
                        <Stack>
                            <Typography variant="h1">Hi, I'm Ollie</Typography>
                            <Typography color="secondary" variant="h4">
                                I'm {age()} years old, studying undergraduate Computer Science at the University of Edinburgh.
                                I have a passion for programming, which stems from a love of solving problems.
                                I direct that passion towards writing high quality code, creating efficient and robust solutions
                                to the problems presented to me.
                                Take a look at my CV <Link href="/about">here</Link>.
                            </Typography>
                        </Stack>
                    </Stack>
                </FadingDiv>
            </Section>
            {/* Contact */}
            <Section>
                <ContactPage />
            </Section>
        </>
    );
}
