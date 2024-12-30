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
export function Experience(): ReactNode {
    // Contains the data for the skills section of my CV.
    const experiences = data.Experience.map(jsonToJSDoc);

    return (
        <div>
            <Typography variant="h3" sx={{ textAlign: "center" }}>Experience</Typography>
            <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                {experiences.map((experience, i) => (
                    <span key={i}>
                        {i > 0 && <Typography component="span" sx={{ color: "gray" }}> • </Typography>}
                        {experience}
                    </span>
                ))}
            </Typography>
        </div>
    );
}
