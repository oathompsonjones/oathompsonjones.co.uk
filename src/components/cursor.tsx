"use client";

import type { ReactElement } from "react";
import useMousePosition from "hooks/useMousePosition";
import { useThemeContext } from "contexts/themeContext";
import useWindowSize from "hooks/useWindowSize";

/**
 * A background cursor.
 * @returns A background cursor.
 */
export default function BackgroundCursor(): ReactElement {
    const { theme: { palette: { primary: { main } } } } = useThemeContext();
    const [r, g, b] = main.slice(1).match(/.{2}/g)!;
    const colour = `rgba(${parseInt(r, 16)}, ${parseInt(g!, 16)}, ${parseInt(b!, 16)}, 0.2)`;
    const { clientX, clientY } = useMousePosition();
    const { width, height } = useWindowSize();
    const mouseX = clientX / width;
    const mouseY = clientY / height;

    return (
        <span
            style={{
                background: "transparent " +
                    `radial-gradient(at calc(${mouseX} * 100%) calc(${mouseY} * 100%), ${colour}, transparent)` +
                    " no-repeat 0 0",
                height: "100%",
                left: "50%",
                objectFit: "cover",
                overflow: "hidden",
                position: "fixed",
                top: 0,
                transform: "translateX(-50%)",
                width: "100%",
                zIndex: -10,
            }}
        />
    );
}
