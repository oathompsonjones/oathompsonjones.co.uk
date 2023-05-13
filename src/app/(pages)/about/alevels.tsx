import { Divider, Paper, Typography } from "@mui/material";
import Grade from "./grade";
import Link from "next/link";

/**
 * Contains the A-Levels segment for my CV page.
 *
 * @returns {JSX.Element} The ALevels element.
 */
export default function ALevels(): JSX.Element {
    return (
        <Paper sx={{ display: "flex", flexDirection: "column", height: 1, padding: "0.5rem 1rem" }}>
            <Typography variant="h4">A-Levels</Typography>
            <Divider sx={{ margin: "1.25% 0%" }} />
            <Grade grade="A*" subject="Computer Science" />
            <Grade grade="B" subject="Further Mathematics" />
            <Grade grade="A*" subject="Mathematics" />
            <Grade grade="A*" subject="Physics" />
            <Divider sx={{ margin: "1.25% 0%" }} />
            <Typography sx={{ bottom: 0 }} variant="caption">
                Attained at <Link href="https://tbshs.org">The Bishop's Stortford High School</Link> in 2021.
            </Typography>
        </Paper>
    );
}
