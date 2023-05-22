"use client";
import type { Breakpoint, Theme, Variant } from "@mui/material";
import { Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useThemeContext } from "contexts/themeContext";

interface IProps {
    beginningText: Array<JSX.Element | string>;
    collapsibleText: Array<JSX.Element | string>;
    endingText: Array<JSX.Element | string>;
    minScreenSize?: Breakpoint;
    variant?: Variant;
}

export default function CollapsibleText({ beginningText, collapsibleText, endingText, minScreenSize, variant }: IProps): JSX.Element {
    const [expandName, setExpandName] = useState(false);
    const showAnimation = useMediaQuery((theme: Theme) => theme.breakpoints.up(minScreenSize ?? "xs"));
    const { theme: { palette: { secondary: { main } } } } = useThemeContext();

    useEffect(() => {
        if (expandName) {
            document.querySelectorAll<HTMLElement>(".collapsible")
                .forEach((element: HTMLElement) => (element.style.width = `${element.scrollWidth}px`));
            document.querySelectorAll<HTMLElement>(".colour")
                .forEach((element: HTMLElement) => (element.style.color = `${main}`));
        } else {
            document.querySelectorAll<HTMLElement>(".collapsible")
                .forEach((element: HTMLElement) => {
                    requestAnimationFrame(() => {
                        element.style.width = `${element.scrollWidth}px`;
                        requestAnimationFrame(() => (element.style.width = "0px"));
                    });
                });
            document.querySelectorAll<HTMLElement>(".colour")
                .forEach((element: HTMLElement) => (element.style.color = ""));
        }
    }, [showAnimation && expandName]);

    return (
        <Typography
            onMouseEnter={(): void => setExpandName(true)}
            onMouseLeave={(): void => setExpandName(false)}
            sx={{
                /* eslint-disable @typescript-eslint/naming-convention */
                ".collapsible": { width: 0 },
                ".colour": { transition: "color 0.25s linear" },
                ".section": { overflow: "hidden", transition: "width 0.25s linear" },
                /* eslint-enable @typescript-eslint/naming-convention */
                "display": "inline-flex",
                "gap": `${0.25 / 3}em`,
                "span": { display: "inline-flex" }
            }}
            variant={variant ?? "body1"}
        >
            {beginningText.map((text, i) => (<span className="section" key={i}>{text}</span>))}
            {collapsibleText.map((text, i) => (<span className="section collapsible" key={i}>{text}</span>))}
            {endingText.map((text, i) => (<span className="section" key={i}>{text}</span>))}
        </Typography>
    );
}
