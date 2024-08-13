import { Stack, Typography } from "@mui/material";
import type { ReactElement } from "react";

/**
 * This component displays a grade.
 * @param props - The properties of the component.
 * @returns The grade.
 */
export default function Grade({ grade, subject }: { readonly grade: string; readonly subject: string; }): ReactElement {
    return (
        <Stack alignItems="center" direction="row" flex={1} sx={{ p: "0 5%" }}>
            <Typography flex={1}>{subject}</Typography>
            <Typography>{grade}</Typography>
        </Stack>
    );
}
