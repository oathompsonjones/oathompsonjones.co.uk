import type P5 from "p5";
import type { SketchProps } from "react-p5/@types";
import { useThemeContext } from "contexts/themeContext";

type RGB = Record<"b" | "g" | "r", number>;

export default abstract class Sketch implements SketchProps {
    protected backgroundColour: RGB;

    protected primaryColour: RGB;

    protected secondaryColour: RGB;

    public constructor() {
        const {
            theme: {
                palette: {
                    background: { default: background },
                    primary: { main: primary },
                    secondary: { main: secondary }
                }
            }
        } = useThemeContext();
        this.backgroundColour = {
            b: parseInt(background.slice(5), 16),
            g: parseInt(background.slice(3, 5), 16),
            r: parseInt(background.slice(1, 3), 16)
        };
        this.primaryColour = {
            b: parseInt(primary.slice(5), 16),
            g: parseInt(primary.slice(3, 5), 16),
            r: parseInt(primary.slice(1, 3), 16)
        };
        this.secondaryColour = {
            b: parseInt(secondary.slice(5), 16),
            g: parseInt(secondary.slice(3, 5), 16),
            r: parseInt(secondary.slice(1, 3), 16)
        };
    }

    public preload(p5: P5): void {
        void [this, p5];
    }

    public mouseClicked(p5: P5, event?: UIEvent): void {
        void [this, p5, event];
    }

    public mouseMoved(p5: P5, event?: UIEvent): void {
        void [this, p5, event];
    }

    public doubleClicked(p5: P5, event?: UIEvent): void {
        void [this, p5, event];
    }

    public mousePressed(p5: P5, event?: UIEvent): void {
        void [this, p5, event];
    }

    public mouseWheel(p5: P5, event?: UIEvent): void {
        void [this, p5, event];
    }

    public mouseDragged(p5: P5, event?: UIEvent): void {
        void [this, p5, event];
    }

    public mouseReleased(p5: P5, event?: UIEvent): void {
        void [this, p5, event];
    }

    public keyPressed(p5: P5, event?: UIEvent): void {
        void [this, p5, event];
    }

    public keyReleased(p5: P5, event?: UIEvent): void {
        void [this, p5, event];
    }

    public keyTyped(p5: P5, event?: UIEvent): void {
        void [this, p5, event];
    }

    public touchStarted(p5: P5): void {
        void [this, p5];
    }

    public touchMoved(p5: P5, event?: UIEvent): void {
        void [this, p5, event];
    }

    public touchEnded(p5: P5, event?: UIEvent): void {
        void [this, p5, event];
    }

    public deviceMoved(p5: P5, event?: Event): void {
        void [this, p5, event];
    }

    public deviceTurned(p5: P5, event?: Event): void {
        void [this, p5, event];
    }

    public deviceShaken(p5: P5, event?: Event): void {
        void [this, p5, event];
    }

    public abstract setup(p5: P5, CanvasParentRef: Element): void;

    public abstract draw(p5: P5): void;
}
