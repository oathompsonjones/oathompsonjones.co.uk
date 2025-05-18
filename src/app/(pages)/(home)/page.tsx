"use client";

import { useEffect, useState } from "react";
import { About } from "components/pages/home/about";
import { Contact } from "components/pages/home/contact";
import { FadingSections } from "components/pages/home/fadingSections";
import Image from "next/image";
import { Main } from "components/pages/home/main";
// Import { ProfilePicture } from "components/pages/home/profilePicture";
import type { ReactNode } from "react";
import { Section } from "components/pages/home/section";
import { Size } from "components/size";
import desk from "assets/images/desk.jpg";
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
    const { themeColour/* , theme */ } = useThemeMode();
    const [index, setIndex] = useState(0);

    const handleScroll = (): void => setIndex(window.scrollY / window.innerHeight);

    // Add event listener for scrolling
    useEffect(() => {
        if (reducedMotion)
            return (): void => undefined;

        handleScroll();
        window.addEventListener("scroll", handleScroll, { capture: true, passive: true });

        return (): void => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Trigger the scroll event when the window size changes
    useEffect(handleScroll, [height, width]);

    // Handle avatar behaviour when index changes
    /* UseEffect(() => {
        const avatar = document.getElementsByClassName("avatar")[0] as HTMLImageElement | undefined;
        const positions = [...document.getElementsByClassName("avatarPosition")]
            .map((av) => av.getBoundingClientRect());

        // Update the position and size of the avatar
        if (avatar !== undefined && width > theme.breakpoints.values.md) {
            avatar.style.display = index > 1 ? "none" : "block";

            const i = Math.round(index);

            if (positions[i] !== undefined) {
                avatar.style.transform = `translate(${positions[i]?.x ?? 0}px, ${positions[i]?.y ?? 0}px)`;
                avatar.style.width = `${positions[i]?.width ?? 0}px`;
                avatar.style.height = `${positions[i]?.height ?? 0}px`;
            }
        }
    }, [index]); */

    return (
        <>
            <Image
                alt="Picture of a computer desk."
                src={desk}
                style={{
                    filter: `brightness(${themeColour === "dark" ? 50 : 60}%) blur(5px)`,
                    left: "50%",
                    minHeight: "100%",
                    minWidth: "100%",
                    objectFit: "cover",
                    position: "fixed",
                    top: "50%",
                    transform: "translate(-50%, -50%) scale(1.1)",
                    transition: "filter 0.5s",
                    zIndex: -5,
                }}
            />
            <Size
                xs={
                    <>
                        <Section>
                            <Main />
                        </Section>
                        <Section>
                            <About />
                        </Section>
                    </>
                }
                lg={
                    <>
                        {/* {!reducedMotion && <ProfilePicture reducedMotion={reducedMotion} />} */}
                        <FadingSections index={index}>
                            <Main />
                            <About />
                        </FadingSections>
                    </>
                }
            />
            <Section allowFooter>
                <Contact />
            </Section>
        </>
    );
}
