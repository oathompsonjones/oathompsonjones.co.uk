"use client";

import type { Breakpoint, Theme, Variant } from "@mui/material";
import type { ReactElement, ReactNode } from "react";
import { Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useThemeContext } from "contexts/themeContext";

type Props = {
    readonly beginningText: Array<ReactNode | string>;
    readonly collapsibleText: Array<ReactNode | string>;
    readonly endingText: Array<ReactNode | string>;
    readonly id: string;
    readonly minScreenSize?: Breakpoint;
    readonly variant?: Variant;
};

/**
 * Renders a collapsible text element.
 * @param props - An object containing the component props.
 * @returns An element which renders a collapsible text element.
 */
export default function CollapsibleText({
    beginningText,
    collapsibleText,
    endingText,
    id,
    minScreenSize,
    variant,
}: Props): ReactElement {
    const [expandName, setExpandName] = useState(false);
    const showAnimation = useMediaQuery((theme: Theme) => theme.breakpoints.up(minScreenSize ?? "xs"));
    const { theme: { palette: { secondary: { main } } } } = useThemeContext();

    const spanCount = beginningText.length + collapsibleText.length + endingText.length;

    useEffect(() => {
        if (expandName) {
            document.querySelectorAll<HTMLElement>(`#${id} .collapsible`)
                .forEach((element: HTMLElement) => {
                    element.style.width = `${element.scrollWidth}px`;
                });
            document.querySelectorAll<HTMLElement>(`#${id} .colour`)
                .forEach((element: HTMLElement) => {
                    element.style.color = main;
                });
            document.querySelectorAll<HTMLElement>(`#${id}`)
                .forEach((element: HTMLElement) => {
                    element.style.gap = "0.25em";
                });
        } else {
            document.querySelectorAll<HTMLElement>(`#${id} .collapsible`)
                .forEach((element: HTMLElement) => {
                    requestAnimationFrame(() => {
                        element.style.width = `${element.scrollWidth}px`;
                        requestAnimationFrame(() => (element.style.width = "0px"));
                    });
                });
            document.querySelectorAll<HTMLElement>(`#${id} .colour`)
                .forEach((element: HTMLElement) => {
                    element.style.color = "";
                });
            document.querySelectorAll<HTMLElement>(`#${id}`)
                .forEach((element: HTMLElement) => {
                    element.style.gap = `${0.25 / spanCount}em`;
                });
        }
    }, [showAnimation && expandName]);

    return (
        <Typography
            id={id}
            onMouseEnter={(): void => setExpandName(true)}
            onMouseLeave={(): void => setExpandName(false)}
            sx={{
                /* eslint-disable @typescript-eslint/naming-convention */
                ".collapsible": { width: 0 },
                ".colour": { transition: "color 0.25s linear" },
                ".section": { overflow: "hidden", transition: "width 0.25s linear" },
                /* eslint-enable @typescript-eslint/naming-convention */
                display: "inline-flex",
                gap: `${0.25 / spanCount}em`,
                transition: "gap 0.25s linear",
            }}
            variant={variant ?? "body1"}
        >
            {beginningText.map((text, i) => (<span className="section" key={i}>{text}</span>))}
            {collapsibleText.map((text, i) => (<span className="section collapsible" key={i}>{text}</span>))}
            {endingText.map((text, i) => (<span className="section" key={i}>{text}</span>))}
        </Typography>
    );
}
