import type { ReactNode } from "react";
import Stack from "components/layout/stack";
import { Typography } from "@mui/material";

/**
 * This component displays a grade.
 * @param props - The properties of the component.
 * @param props.grade - The grade to display.
 * @param props.subject - The subject to display.
 * @returns The formatted grade.
 */
export function Grade({ grade, subject }: { grade: ReactNode; subject: ReactNode; }): ReactNode {
    return (
        <Stack direction="row" sx={{ alignItems: "center", flex: 1, px: "2%" }}>
            <Typography sx={{ flex: 1 }}>{subject}</Typography>
            <Typography>{grade}</Typography>
        </Stack>
    );
}
