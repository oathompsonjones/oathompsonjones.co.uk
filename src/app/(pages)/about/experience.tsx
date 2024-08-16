import { Divider, Typography } from "@mui/material";
import type { CV } from "api/cv/route";
import type { ReactElement } from "react";
import cv from "assets/cv.json";
import { jsonToJSDoc } from "api/cv";

const data = cv as CV;

/**
 * Contains the experience segment for my CV page.
 * @returns The Experience element.
 */
export function Experience(): ReactElement {
    // Contains the data for the experience section of my CV.
    const experiences: Array<{ content: ReactElement; heading: string; }> = Object.keys(data.Experience).map((experience) => ({
        content: jsonToJSDoc(data.Experience[experience]!),
        heading: experience,
    }));

    return (
        <>
            <Typography variant="h3">Experience</Typography>
            {experiences.map(({ content, heading }) => (
                <>
                    <Divider />
                    <Typography variant="subtitle1">{heading}</Typography>
                    <Typography variant="body2">{content}</Typography>
                </>
            ))}
        </>
    );
}
