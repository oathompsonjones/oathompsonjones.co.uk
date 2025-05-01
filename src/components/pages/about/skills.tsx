import type { CV } from "app/(pages)/cv/route";
import type { ReactNode } from "react";
import Stack from "components/layout/stack";
import { Typography } from "@mui/material";
import cv from "assets/cv.json";
import { jsonToJSDoc } from "app/(pages)/cv";

const data = cv as CV;

const divider = <Typography sx={{ color: "gray" }}>•</Typography>;

/**
 * Renders a list of skills.
 * @param props - The component properties.
 * @param props.title - The title to render left of the list.
 * @param props.list - The list of skills to render.
 * @returns A list of skills.
 */
function SkillList({ title, list }: { title: string; list: string[]; }): ReactNode {
    return (
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Typography variant="h6" sx={{ color: "var(--mui-palette-secondary-main)" }}>{title}:</Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }} divider={divider}>
                {list.map(jsonToJSDoc).map((skill, i) => <span key={i}>{skill}</span>)}
            </Stack>
        </Stack>
    );
}

/**
 * Contains the skills segment for my CV page.
 * @returns The Skills element.
 */
export function Skills(): ReactNode {
    // Contains the data for the skills section of my CV.
    const languages = data.Skills.Languages;
    const technologies = data.Skills.Technologies;
    const other = data.Skills.Other;

    return (
        <div>
            <Typography variant="h3">Skills</Typography>
            <SkillList title="Languages" list={languages} />
            <SkillList title="Technologies" list={technologies} />
            <SkillList title="Other" list={other} />
        </div>
    );
}
