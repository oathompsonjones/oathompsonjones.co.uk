import { Divider, Stack, Typography } from "@mui/material";
import type { CV } from "app/(pages)/cv/route";
import { Glass } from "components/glass";
import type { ReactNode } from "react";
import cv from "assets/cv.json";
import { jsonToJSDoc } from "app/(pages)/cv";

const data = cv as CV;
const divider = <Typography sx={{ color: "gray" }}>•</Typography>;

/**
 * Contains the skills segment for my CV page.
 * @returns The Skills element.
 */
export function Skills(): ReactNode {
    const languages = data.Skills.Languages;
    const technologies = data.Skills.Technologies;
    const other = data.Skills.Other;

    const renderSkillList = (title: string, list: string[]): ReactNode => (
        <Stack
            direction={{ sm: "row", xs: "column" }}
            key={title}
            spacing={2}
            sx={{ alignItems: { sm: "center", xs: "flex-start" }, flexWrap: { sm: "wrap", xs: "nowrap" }, rowGap: 1 }}
            useFlexGap
        >
            <Typography color="text.secondary" variant="h6">{title}:</Typography>
            <Stack
                direction="row"
                divider={divider}
                spacing={1}
                sx={{ alignItems: "center", flexWrap: "wrap", rowGap: 1 }}
                useFlexGap
            >
                {list.map((skill, index) => <span key={`${title}-${skill}-${index}`}>{jsonToJSDoc(skill)}</span>)}
            </Stack>
        </Stack>
    );

    return (
        <div>
            <Typography align="center" variant="h3">Skills</Typography>
            <Divider />
            <Glass>
                <Stack spacing={3}>
                    {renderSkillList("Languages", languages)}
                    {renderSkillList("Technologies", technologies)}
                    {renderSkillList("Other", other)}
                </Stack>
            </Glass>
        </div>
    );
}
