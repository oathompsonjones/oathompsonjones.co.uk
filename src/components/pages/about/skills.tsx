import { Divider, Typography } from "@mui/material";
import type { CV } from "api/cv/route";
import type { ReactNode } from "react";
import cv from "assets/cv.json";
import { jsonToJSDoc } from "api/cv";

const data = cv as CV;

/**
 * Contains the skills segment for my CV page.
 * @returns The Skills element.
 */
export function Skills(): ReactNode {
    // Contains the data for the skills section of my CV.
    const skills: Array<{ content: ReactNode; heading: string; }> = Object.keys(data.Skills).map((skill) => ({
        content: jsonToJSDoc(data.Skills[skill]!),
        heading: skill,
    }));

    return (
        <>
            <Typography variant="h3">Skills</Typography>
            {skills.map(({ content, heading }, i) => (
                <div key={i}>
                    <Divider />
                    <Typography variant="subtitle1">{heading}</Typography>
                    <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>{content}</Typography>
                </div>
            ))}
        </>
    );
}
