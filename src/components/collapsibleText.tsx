"use client";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import type { Variant } from "@mui/material";

interface IProps {
    beginningText: Array<JSX.Element | string>;
    collapsibleText: Array<JSX.Element | string>;
    endingText: Array<JSX.Element | string>;
    variant?: Variant;
}

export default function CollapsibleText({ beginningText, collapsibleText, endingText, variant }: IProps): JSX.Element {
    const [expandName, setExpandName] = useState(false);

    useEffect(() => {
        if (expandName) {
            document.querySelectorAll<HTMLElement>(".collapsible")
                .forEach((element: HTMLElement) => (element.style.width = `${element.scrollWidth}px`));
        } else {
            document.querySelectorAll<HTMLElement>(".collapsible")
                .forEach((element: HTMLElement) => {
                    requestAnimationFrame(() => {
                        element.style.width = `${element.scrollWidth}px`;
                        requestAnimationFrame(() => (element.style.width = "0px"));
                    });
                });
        }
    }, [expandName]);

    return (
        <Typography
            onMouseEnter={(): void => setExpandName(true)}
            onMouseLeave={(): void => setExpandName(false)}
            sx={{
                /* eslint-disable @typescript-eslint/naming-convention */
                "&:hover": {
                    ".colour": { color: "secondary.main" },
                    "gap": "0.25em"
                },
                ".collapsible": { width: 0 },
                ".colour": { transition: "color 0.25s linear" },
                ".section": {
                    overflow: "hidden",
                    transition: "width 0.25s linear"
                },
                "display": "inline-flex",
                "gap": `${0.25 / 3}em`,
                "span": { display: "inline-flex" }
                /* eslint-enable @typescript-eslint/naming-convention */
            }}
            variant={variant ?? "body1"}
        >
            {beginningText.map((text, i) => (<span className="section" key={i}>{text}</span>))}
            {collapsibleText.map((text, i) => (<span className="section collapsible" key={i}>{text}</span>))}
            {endingText.map((text, i) => (<span className="section" key={i}>{text}</span>))}
        </Typography>
    );
}
