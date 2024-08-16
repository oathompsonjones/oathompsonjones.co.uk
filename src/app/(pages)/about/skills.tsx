import { Divider, Typography } from "@mui/material";
import type { ReactElement } from "react";
import { jsonToJSDoc, type CV } from "api/cv";
import cv from "assets/cv.json";

const data = cv as CV;

/**
 * Contains the skills segment for my CV page.
 * @returns The Skills element.
 */
export default function Skills(): ReactElement {
    // Contains the data for the skills section of my CV.
    const skills: Array<{ content: ReactElement; heading: string; }> = Object.keys(data.Skills).map((skill) => ({
        content: jsonToJSDoc(data.Skills[skill]!),
        heading: skill,
    }));

    return (
        <>
            <Typography variant="h3">Skills</Typography>
            {skills.map(({ content, heading }) => (
                <>
                    <Divider />
                    <Typography variant="subtitle1">{heading}</Typography>
                    <Typography variant="body2">{content}</Typography>
                </>
            ))}
        </>
    );
}
