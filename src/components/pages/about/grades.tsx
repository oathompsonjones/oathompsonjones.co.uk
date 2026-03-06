import { Box, Stack } from "@mui/system";
import { Divider, Typography } from "@mui/material";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Contains a set of grades for the CV page.
 * @param props - The component properties.
 * @param props.attainmentYear - The year the grades were attained.
 * @param props.children - The children to render.
 * @param props.educationLevel - The level of education, i.e. GCSEs, A Levels or further.
 * @param props.institutionLink - The link to the institution.
 * @param props.institutionName - The name of the institution, i.e. TBSHS or UoE.
 * @param props.maxGrade - The maximum grade.
 * @param props.minGrade - The minimum grade.
 * @returns The Grades element.
 */
export function Grades(props: {
    attainmentYear: number;
    children: ReactNode;
    educationLevel: ReactNode;
    institutionLink: string;
    institutionName: string;
    maxGrade: ReactNode;
    minGrade: ReactNode;
}): ReactNode {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
                <Typography variant="h4" sx={{ flex: 1 }}>{props.educationLevel}</Typography>
                <Typography variant="h6">({props.minGrade} – {props.maxGrade})</Typography>
            </Stack>
            <Divider />
            {props.children}
            <Divider />
            <Typography variant="caption">
                <Link href={props.institutionLink}>{props.institutionName}</Link> ({props.attainmentYear})
            </Typography>
        </Box>
    );
}
