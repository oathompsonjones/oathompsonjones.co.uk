import { Glass } from "components/glass";
import type { ReactNode } from "react";
import { Typography } from "@mui/material";
import { age } from "utils";
import cv from "assets/cv.json";
import { jsonToJSDoc } from "app/(pages)/cv";

/**
 * Contains the bio segment for my CV page.
 * @param props - The props for the Bio component.
 * @param props.large - Whether the bio should be large or not.
 * @returns The Bio element.
 */
export function Bio({ large = false }: { large?: boolean; }): ReactNode {
    return (
        <Glass>
            <Typography sx={{ whiteSpace: "pre-wrap" }} variant={large ? "h4" : "h6"} color="white">
                {[
                    `Hi, I'm Ollie. I'm a ${age()} year old`,
                    jsonToJSDoc(cv.Summary),
                ].join(" ").split("\n").join("\n\n")}
            </Typography>
        </Glass>
    );
}
