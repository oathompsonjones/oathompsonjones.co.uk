import { Divider, Typography } from "@mui/material";
import type { ReactElement } from "react";
import type { CV } from "api/cv";
import { jsonToJSDoc } from "api/cv";
import cv from "assets/cv.json";

const data = cv as CV;

/**
 * Contains the experience segment for my CV page.
 * @returns The Experience element.
 */
export default function Experience(): ReactElement {
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
