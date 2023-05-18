"use client";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

export default function Name(): JSX.Element {
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
        >
            <span className="section">
                <span className="colour">O</span>liver
            </span>
            <span className="section collapsible">
                <span className="colour">A</span>ndrew
            </span>
            <span className="section collapsible colour">Thompson</span>
            <span className="section colour">Jones</span>
        </Typography>
    );
}
