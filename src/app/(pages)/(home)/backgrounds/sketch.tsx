"use client";
import type P5 from "p5";
import type P5Sketch from "./sketches/sketch";
import dynamic from "next/dynamic";
import useWindowSize from "hooks/useWindowSize";

const SketchWrapper = dynamic(async () => import("react-p5").then((mod) => mod.default), { ssr: false });

export default function Sketch({ sketch: SketchConstuctor }: { sketch: new() => P5Sketch; }): JSX.Element {
    const { outerWidth, outerHeight } = useWindowSize();
    const sketch = new SketchConstuctor();

    return (
        <SketchWrapper
            deviceMoved={sketch.deviceMoved.bind(sketch)}
            deviceShaken={sketch.deviceShaken.bind(sketch)}
            deviceTurned={sketch.deviceTurned.bind(sketch)}
            doubleClicked={sketch.doubleClicked.bind(sketch)}
            draw={sketch.draw.bind(sketch)}
            keyPressed={sketch.keyPressed.bind(sketch)}
            keyReleased={sketch.keyReleased.bind(sketch)}
            keyTyped={sketch.keyTyped.bind(sketch)}
            mouseClicked={sketch.mouseClicked.bind(sketch)}
            mouseDragged={sketch.mouseDragged.bind(sketch)}
            mouseMoved={sketch.mouseMoved.bind(sketch)}
            mousePressed={sketch.mousePressed.bind(sketch)}
            mouseReleased={sketch.mouseReleased.bind(sketch)}
            mouseWheel={sketch.mouseWheel.bind(sketch)}
            preload={sketch.preload.bind(sketch)}
            setup={sketch.setup.bind(sketch)}
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
            touchEnded={sketch.touchEnded.bind(sketch)}
            touchMoved={sketch.touchMoved.bind(sketch)}
            touchStarted={sketch.touchStarted.bind(sketch)}
            windowResized={(p5: P5): void => p5.resizeCanvas(outerWidth, outerHeight)}
        />
    );
}
