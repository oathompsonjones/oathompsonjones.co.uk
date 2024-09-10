import type { CSSProperties, ElementType, ReactNode } from "react";
import { createElement } from "react";

/**
 * A layout component.
 * @param props - The properties of the component.
 * @param props.component - The component to render as.
 * @param props.style - The styles to apply.
 * @param props.children - The children to render.
 * @param props.wrapper - Whether the layout is a wrapper.
 * @param props.edge - Whether the layout is an edge.
 * @param props.fullWidth - Whether the layout is full width.
 * @param props.breakout - Whether the layout is a breakout.
 * @param props.breakoutLeft - Whether the layout is a breakout left.
 * @param props.breakoutRight - Whether the layout is a breakout right.
 * @returns The layout component.
 */
export function Layout(props: {
    children: ReactNode;
    component?: ElementType;
    style?: CSSProperties;
    wrapper?: true;
} & (
    | Record<never, never>
    | { breakout: true; }
    | { breakoutLeft: true; }
    | { breakoutRight: true; }
    | { edge: true; }
    | { fullWidth: true; }
)): ReactNode {
    const classes: string[] = props.wrapper ? ["wrapper"] : [];

    switch (true) {
        case "edge" in props:
            classes.push("edge");
            break;
        case "fullWidth" in props:
            classes.push("full-width");
            break;
        case "breakout" in props:
            classes.push("breakout");
            break;
        case "breakoutLeft" in props:
            classes.push("breakout-left");
            break;
        case "breakoutRight" in props:
            classes.push("breakout-right");
            break;
        default:
            break;
    }

    return createElement(props.component ?? "div", {
        className: classes.length > 0 ? classes.join(" ") : undefined,
        style: props.style,
    }, props.children);
}
