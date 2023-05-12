"use client";
import type { CSSProperties, FunctionComponent } from "react";
import { Card, CardMedia } from "@mui/material";
import { createElement, useState } from "react";
import Link from "next/link";
import type { TransitionProps } from "@mui/material/transitions";

interface IProps {
    children?: JSX.Element;
    effect?: {
        element: FunctionComponent<TransitionProps>;
        props: TransitionProps;
    };
    href: string;
    image: string;
}

export default function ImageLinkOverlay({ children, effect, href, image }: IProps): JSX.Element {
    // Hover overlay handler
    const [hover, setHover] = useState(false);
    const handleHover = (): void => setHover((prev) => !prev);
    // CSS
    const container: CSSProperties = {
        border: "none",
        boxShadow: "none",
        position: "relative"
    };
    const box: CSSProperties = {
        height: "100%",
        width: "100%"
    };
    const overlay: CSSProperties = {
        background: "rgba(0, 0, 0, 0.25)",
        display: hover ? "block" : "none",
        position: "absolute"
    };
    // Component
    const component = (
        <Card onMouseEnter={handleHover} onMouseLeave={handleHover} square style={container}>
            <Link href={href} style={{ ...box, ...overlay }}>
                {children}
            </Link>
            <CardMedia component="img" image={image} style={box} />
        </Card>
    );
    // If an effect is given, wrap the component in that effect.
    return effect === undefined ? component : createElement(effect.element, effect.props, component);
}
