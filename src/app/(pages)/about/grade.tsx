import { Stack, Typography } from "@mui/material";
import type { ReactElement, ReactNode } from "react";

/**
 * This component displays a grade.
 * @param props - The properties of the component.
 * @returns The grade.
 */
export default function Grade({ grade, subject }: Readonly<{ grade: ReactNode; subject: ReactNode; }>): ReactElement {
    return (
        <Stack alignItems="center" direction="row" flex={1} sx={{ px: "2%" }}>
            <Typography flex={1}>{subject}</Typography>
            <Typography>{grade}</Typography>
        </Stack>
    );
}
