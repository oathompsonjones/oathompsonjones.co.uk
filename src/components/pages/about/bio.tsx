import { Glass } from "components/glass";
import type { ReactNode } from "react";
import { Typography } from "@mui/material";
import { age } from "utils";
import cv from "assets/cv.json";
import { jsonToJSDoc } from "app/(pages)/cv";

/**
 * Contains the bio segment for my CV page.
 * @returns The Bio element.
 */
export function Bio(): ReactNode {
    return (
        <Glass sx={{ m: "auto" }}>
            <Typography variant="h6" color="white">
                {[
                    `Hi, I'm Ollie. I'm a ${age()} year old`,
                    jsonToJSDoc(cv.Summary),
                ].join(" ").split("\n").join("\n\n")}
            </Typography>
        </Glass>
    );
}
