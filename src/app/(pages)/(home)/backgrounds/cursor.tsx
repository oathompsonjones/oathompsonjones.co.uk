"use client";
import useMousePosition from "hooks/useMousePosition";
import { useThemeContext } from "contexts/themeContext";
import useWindowSize from "hooks/useWindowSize";

export default function BackgroundCursor(): React.ReactElement {
    const { theme: { palette: { primary: { main } } } } = useThemeContext();
    const [r, g, b] = main.slice(1).match(/.{2}/ug)!;
    const colour = `rgba(${parseInt(r, 16)}, ${parseInt(g!, 16)}, ${parseInt(b!, 16)}, 0.2)`;
    const { clientX, clientY } = useMousePosition();
    const { innerWidth, innerHeight } = useWindowSize();
    const mouseX = clientX / innerWidth;
    const mouseY = clientY / innerHeight;

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
                position: "absolute",
                top: 0,
                transform: "translateX(-50%)",
                width: "100%"
            }}
        />
    );
}
