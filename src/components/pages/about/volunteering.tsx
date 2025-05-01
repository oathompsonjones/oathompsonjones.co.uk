import { Divider, Typography } from "@mui/material";
import type { CV } from "app/(pages)/cv/route";
import type { ReactNode } from "react";
import cv from "assets/cv.json";
import { jsonToJSDoc } from "app/(pages)/cv";

const data = cv as CV;

/**
 * Contains the volunteering segment for my CV page.
 * @returns The Volunteering element.
 */
export function Volunteering(): ReactNode {
    // Contains the data for the experience section of my CV.
    const volunteering = data.Volunteering.map(({ role, organisation, time, description }) => ({
        description,
        heading: jsonToJSDoc(`${role}${organisation ? `, ${organisation}` : ""} — ${time}`),
    }));

    return (
        <div>
            <Typography variant="h3">Volunteer Experience</Typography>
            {volunteering.map(({ description, heading }, i) => (
                <div key={i}>
                    <Divider />
                    <Typography variant="subtitle1">{heading}</Typography>
                    <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }} component="ul">
                        {description.map((item, j) => <li key={j}>{item}</li>)}
                    </Typography>
                </div>
            ))}
        </div>
    );
}
