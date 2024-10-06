"use client";

import Image from "next/image";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import type { ReactNode } from "react";
import desk from "assets/images/desk.jpg";
import { gameOfLife } from "./sketches/gameOfLife";
import { matrix } from "./sketches/matrix";
import { useMediaQuery } from "@mui/system";
import { usePathname } from "next/navigation";
import { useThemeMode } from "hooks/useThemeMode";
import { useWindowSize } from "hooks/useWindowSize";

/**
 * Converts a hex colour to RGB.
 * @param hex - The hex colour to convert to RGB.
 * @returns The RGB colour.
 */
export function hexToRgb(hex: string): [number, number, number] {
    return (hex.replace(/#/g, "")
        .match(/.{1,2}/g)?.map((x) => parseInt(x, 16)) ?? [0, 0, 0]) as [number, number, number];
}

/**
 * A div which will be used to either fade in or out.
 * @returns A div.
 */
export function Background(): ReactNode {
    const { themeColour, theme } = useThemeMode();
    const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
    const sketches = [
        matrix(theme, themeColour),
        gameOfLife(theme),
    ];
    const sketch = sketches[Math.floor(Math.random() * sketches.length)];

    // Reload the background when the window size changes
    useWindowSize();

    switch (usePathname()) {
        case "/":
            return (
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
            );
        default:
            return (
                <div style={{
                    filter: "blur(3px)",
                    height: "100vh",
                    left: 0,
                    overflow: "hidden",
                    position: "fixed",
                    top: 0,
                    width: "100vw",
                    zIndex: -10,
                }}>
                    {!reducedMotion && <NextReactP5Wrapper sketch={sketch} />}
                </div>
            );
    }
}
