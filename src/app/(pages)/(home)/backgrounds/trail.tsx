"use client";
import dynamic from "next/dynamic";
import sketch from "./sketch";

const Sketch = dynamic(async () => import("react-p5").then((mod) => mod.default), { ssr: false });

export default function BackgroundTrail(): JSX.Element {
    const { setup, draw, mouseMoved } = sketch();
    return (
        <Sketch
            draw={draw}
            mouseMoved={mouseMoved}
            setup={setup}
            style={{
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
