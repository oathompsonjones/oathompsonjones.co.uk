import { Divider, Paper, Typography } from "@mui/material";
import Grade from "./grade";
import Link from "next/link";
import type { ReactElement } from "react";

/**
 * Contains the A-Levels segment for my CV page.
 * @returns The ALevels element.
 */
export default function ALevels(): ReactElement {
    return (
        <Paper sx={{ display: "flex", flexDirection: "column", height: "100%", p: "2%" }}>
            <Typography variant="h4">A-Levels</Typography>
            <Divider sx={{ m: "1.25% 0%" }} />
            <Grade grade="A*" subject="Computer Science" />
            <Grade grade="B" subject="Further Mathematics" />
            <Grade grade="A*" subject="Mathematics" />
            <Grade grade="A*" subject="Physics" />
            <Divider sx={{ m: "1.25% 0%" }} />
            <Typography sx={{ bottom: 0 }} variant="caption">
                Attained at <Link href="https://tbshs.org">The Bishop's Stortford High School</Link> in 2021.
            </Typography>
        </Paper>
    );
}
