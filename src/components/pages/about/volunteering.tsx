import { Divider, Typography } from "@mui/material";
import type { CV } from "api/cv/route";
import type { ReactNode } from "react";
import cv from "assets/cv.json";
import { jsonToJSDoc } from "api/cv";

const data = cv as CV;

/**
 * Contains the volunteering segment for my CV page.
 * @returns The Volunteering element.
 */
export function Volunteering(): ReactNode {
    // Contains the data for the experience section of my CV.
    const volunteering = Object.keys(data.Volunteering).map((volunteer) => ({
        content: jsonToJSDoc(data.Volunteering[volunteer]!),
        heading: jsonToJSDoc(volunteer),
    }));

    return (
        <>
            <Typography variant="h3">Volunteering</Typography>
            {volunteering.map(({ content, heading }, i) => (
                <div key={i}>
                    <Divider />
                    <Typography variant="subtitle1">{heading}</Typography>
                    <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>{content}</Typography>
                </div>
            ))}
        </>
    );
}
