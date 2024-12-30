import type { CV } from "app/(pages)/cv/route";
import type { ReactNode } from "react";
import { Typography } from "@mui/material";
import cv from "assets/cv.json";
import { jsonToJSDoc } from "app/(pages)/cv";

const data = cv as CV;

/**
 * Contains the skills segment for my CV page.
 * @returns The Skills element.
 */
export function Skills(): ReactNode {
    // Contains the data for the skills section of my CV.
    const skills = data.Skills.map(jsonToJSDoc);

    return (
        <div>
            <Typography variant="h3" sx={{ textAlign: "center" }}>Skills</Typography>
            <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                {skills.map((skill, i) => (
                    <span key={i}>
                        {i > 0 && <Typography component="span" sx={{ color: "gray" }}> • </Typography>}
                        {skill}
                    </span>
                ))}
            </Typography>
        </div>
    );
}
