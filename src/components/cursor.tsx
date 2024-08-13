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
    const x = `calc(${mouseX} * 100%)`;
    const y = `calc(${mouseY} * 100%)`;

    return (
        <div
            style={{
                background: `radial-gradient(circle at ${x} ${y}, ${colour} 0, transparent, transparent 100%)`,
                height: "100vh",
                left: 0,
                overflow: "hidden",
                position: "fixed",
                top: 0,
                transform: "translateX(-50%, -50%)",
                width: "100vw",
                zIndex: -10,
            }}
        />
    );
}
