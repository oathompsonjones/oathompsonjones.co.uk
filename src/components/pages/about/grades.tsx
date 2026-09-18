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
export function Grades({
    attainmentYear,
    children,
    educationLevel,
    institutionLink,
    institutionName,
    maxGrade,
    minGrade,
}: {
    readonly attainmentYear: number;
    readonly children: ReactNode;
    readonly educationLevel: ReactNode;
    readonly institutionLink: string;
    readonly institutionName: string;
    readonly maxGrade: ReactNode;
    readonly minGrade: ReactNode;
}): ReactNode {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
                <Typography sx={{ flex: 1 }} variant="h4">{educationLevel}</Typography>
                <Typography variant="h6">({minGrade} – {maxGrade})</Typography>
            </Stack>
            <Divider />
            {children}
            <Divider />
            <Typography variant="caption">
                <Link href={institutionLink}>{institutionName}</Link> ({attainmentYear})
            </Typography>
        </Box>
    );
}
