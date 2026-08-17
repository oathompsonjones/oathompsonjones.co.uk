import { Divider, Typography } from "@mui/material";
import type { CV } from "app/(pages)/cv/route";
import { Glass } from "components/glass";
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
    const experiences = data.Experience.map(({ role, organisation, time, description }) => ({
        description,
        heading: jsonToJSDoc(`${role}${organisation ? `, ${organisation}` : ""} — ${time}`),
    }));

    return (
        <div>
            <Typography variant="h3" align="center">Experience</Typography>
            <Divider />
            <Glass>
                {experiences.map(({ description, heading }, i) => (
                    <div key={i}>
                        {i > 0 && <Divider />}
                        <Typography variant="subtitle1">{heading}</Typography>
                        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }} component="ul">
                            {description.map((item, j) => <li key={j}>{item}</li>)}
                        </Typography>
                    </div>
                ))}
            </Glass>
        </div>
    );
}
