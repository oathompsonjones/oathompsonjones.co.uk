import { Divider, Typography } from "@mui/material";
import type { CV } from "app/(pages)/cv/route";
import type { ReactNode } from "react";
import cv from "assets/cv.json";
import { jsonToJSDoc } from "app/(pages)/cv";

const data = cv as CV;

/**
 * Contains the experience segment for my CV page.
 * @returns The Experience element.
 */
export function Experience(): ReactNode {
    // Contains the data for the experience section of my CV.
    const experiences = Object.keys(data.Experience).map((experience) => ({
        content: jsonToJSDoc(data.Experience[experience]!),
        heading: jsonToJSDoc(experience),
    }));

    return (
        <>
            <Typography variant="h3">Experience</Typography>
            {experiences.map(({ content, heading }, i) => (
                <div key={i}>
                    <Divider />
                    <Typography variant="subtitle1">{heading}</Typography>
                    <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>{content}</Typography>
                </div>
            ))}
        </>
    );
}
