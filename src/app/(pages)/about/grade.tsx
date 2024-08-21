import type { ReactElement, ReactNode } from "react";
import { Stack, Typography } from "@mui/material";

/**
 * This component displays a grade.
 * @param props - The properties of the component.
 * @param props.grade - The grade to display.
 * @param props.subject - The subject to display.
 * @returns The formatted grade.
 */
export function Grade({ grade, subject }: { grade: ReactNode; subject: ReactNode; }): ReactElement {
    return (
        <Stack alignItems="center" direction="row" flex={1} sx={{ px: "2%" }}>
            <Typography flex={1}>{subject}</Typography>
            <Typography>{grade}</Typography>
        </Stack>
    );
}
