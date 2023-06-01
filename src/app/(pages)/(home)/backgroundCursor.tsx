"use client";
import { useEffect, useState } from "react";
import { useThemeContext } from "contexts/themeContext";

export default function BackgroundCursor(): JSX.Element {
    const { theme: { palette: { primary: { main: colour } } } } = useThemeContext();
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    useEffect(() => {
        const size = document.getElementById("cursor")!.scrollHeight;
        document.addEventListener("mousemove", (e) => {
            setMouseX(e.clientX);
            setMouseY(e.clientY - size / 2);
        });
    }, []);

    return (
        <span
            id="cursor"
            style={{
                aspectRatio: "1 / 1",
                background: `radial-gradient(${colour} -25%, transparent 50%)`,
                borderRadius: "100%",
                height: "100%",
                left: mouseX,
                position: "absolute",
                top: mouseY,
                transform: "translateX(-50%)"
            }}
        />
    );
}
