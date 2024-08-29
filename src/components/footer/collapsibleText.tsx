"use client";

import type { Breakpoint, Theme } from "@mui/material";
import type { ReactElement, ReactNode } from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import type { Variant } from "@mui/material/styles/createTypography";

/**
 * Renders a collapsible text element.
 * @param props - An object containing the component props.
 * @param props.beginningText - The text to display before the collapsible text.
 * @param props.collapsibleText - The text to display when the text is collapsed.
 * @param props.endingText - The text to display after the collapsible text.
 * @param props.id - The ID of the component.
 * @param props.minScreenSize - The minimum screen size to display the full text.
 * @param props.variant - The text variant to use.
 * @returns An element which renders a collapsible text element.
 */
export function CollapsibleText({ beginningText, collapsibleText, endingText, id, minScreenSize, variant }: {
    beginningText: Array<ReactNode | string>;
    collapsibleText: Array<ReactNode | string>;
    endingText: Array<ReactNode | string>;
    id: string;
    minScreenSize?: Breakpoint;
    variant?: Variant;
}): ReactElement {
    const [expandName, setExpandName] = useState(false);
    const showAnimation = useMediaQuery((theme: Theme) => theme.breakpoints.up(minScreenSize ?? "xs"));
    const { palette: { secondary: { main } } } = useTheme();

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
