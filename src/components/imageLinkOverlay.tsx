"use client";
import { Card, CardMedia } from "@mui/material";
import { createElement, useState } from "react";
import type { FunctionComponent } from "react";
import Link from "next/link";
import type { TransitionProps } from "@mui/material/transitions";

interface IProps {
    readonly children?: React.ReactElement;
    readonly effect?: {
        element: FunctionComponent<TransitionProps>;
        props: TransitionProps;
    };
    readonly glow?: boolean;
    readonly href: string;
    readonly image: string;
}

export default function ImageLinkOverlay({ children, effect, glow, href, image }: IProps): React.ReactElement {
    // Hover overlay handler
    const [hover, setHover] = useState(false);
    const handleHover = (): void => setHover((prev) => !prev);
    const component = (
        <Card
            onMouseEnter={handleHover} onMouseLeave={handleHover} square
            sx={{ border: "none", boxShadow: "none", overflow: "visible", position: "relative" }}
        >
            <Link
                href={href}
                style={{
                    background: "rgba(0, 0, 0, 0.25)",
                    display: hover ? "block" : "none",
                    height: "100%",
                    position: "absolute",
                    width: "100%"
                }}
            >
                {children}
            </Link>
            <CardMedia
                component="img"
                image={image}
                sx={glow ?? false ? {
                    filter: "blur(10px)",
                    height: "calc(100% + 0.25rem)",
                    margin: "-0.125rem",
                    position: "absolute",
                    width: "calc(100% + 0.25rem)",
                    zIndex: -1
                } : { display: "none" }}
            />
            <CardMedia component="img" image={image} sx={{ height: "100%", width: "100%" }} />
        </Card>
    );
    // If an effect is given, wrap the component in that effect.
    return effect === undefined ? component : createElement(effect.element, effect.props, component);
}
