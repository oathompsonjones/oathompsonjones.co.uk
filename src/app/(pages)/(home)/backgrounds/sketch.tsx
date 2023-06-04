"use client";
import type P5 from "p5";
import type { SketchProps } from "react-p5/@types";
import dynamic from "next/dynamic";
import useWindowSize from "hooks/useWindowSize";

const SketchComponent = dynamic(async () => import("react-p5").then((mod) => mod.default), { ssr: false });

export default function Sketch({ sketchProps }: { sketchProps: SketchProps; }): JSX.Element {
    const { outerWidth, outerHeight } = useWindowSize();

    return (
        <SketchComponent
            {...sketchProps}
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
            windowResized={(p5: P5): void => p5.resizeCanvas(outerWidth, outerHeight)}
        />
    );
}
