"use client";
import type { CSSProperties } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";
import { useState } from "react";

interface IProps {
    children?: JSX.Element;
    effect?: (children: JSX.Element) => JSX.Element;
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
    return effect === undefined ? component : effect(component);
}
