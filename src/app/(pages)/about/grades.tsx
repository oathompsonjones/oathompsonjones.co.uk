import { Divider, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import type { ReactElement, ReactNode } from "react";

/**
 * Contains a set of grades for the CV page.
 * @returns The Grades element.
 */
export default function Grades({
    attainmentYear,
    children,
    educationLevel,
    institutionLink,
    institutionName,
    maxGrade,
    minGrade,
}: Readonly<{
    attainmentYear: number;
    children: ReactElement[];
    educationLevel: ReactNode;
    institutionLink: string;
    institutionName: string;
    maxGrade: ReactNode;
    minGrade: ReactNode;
}>): ReactElement {
    return (
        <Paper sx={{ display: "flex", flexDirection: "column", height: "100%", p: "2%" }}>
            <Stack direction="row" alignItems="center">
                <Typography variant="h4" flex={1}>{educationLevel}</Typography>
                <Typography variant="h6">({maxGrade} – {minGrade})</Typography>
            </Stack>
            <Divider />
            {children}
            <Divider />
            <Typography sx={{ bottom: 0 }} variant="caption">
                Attained at <Link href={institutionLink}>{institutionName}</Link> in {attainmentYear}.
            </Typography>
        </Paper>
    );
}
