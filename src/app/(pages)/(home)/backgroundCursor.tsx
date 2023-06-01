"use client";
import { useEffect } from "react";
import { useThemeContext } from "contexts/themeContext";

export default function BackgroundCursor(): JSX.Element {
    const { theme: { palette: { primary: { main: colour } } } } = useThemeContext();

    useEffect(() => {
        const effect = document.getElementById("cursor")!;
        const size = effect.scrollHeight;
        document.addEventListener("mousemove", (e) => {
            effect.style.opacity = "1";
            effect.style.left = `${e.clientX}px`;
            effect.style.top = `${e.clientY - size / 2}px`;
            setTimeout(() => (effect.style.opacity = "0"), 1000);
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
                left: "50%",
                opacity: 0,
                position: "absolute",
                top: "50%",
                transform: "translateX(-50%)",
                transition: "background 0.5s linear"
            }}
        />
    );
}
