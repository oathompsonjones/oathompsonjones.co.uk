import { Divider, Paper, Typography } from "@mui/material";
import Grade from "./grade";
import Link from "next/link";

/**
 * Contains the GCSEs segment for my CV page.
 *
 * @returns {React.ReactNode} The GCSEs element.
 */
export default function GCSEs(): React.ReactNode {
    return (
        <Paper sx={{ display: "flex", flexDirection: "column", height: "100%", p: "2%" }}>
            <Typography variant="h4">GCSEs</Typography>
            <Divider sx={{ m: "1.25% 0%" }} />
            <Grade grade="8" subject="Biology" />
            <Grade grade="7" subject="Chemistry" />
            <Grade grade="8" subject="Computer Science" />
            <Grade grade="8" subject="English Language" />
            <Grade grade="7" subject="English Literature" />
            <Grade grade="7" subject="French" />
            <Grade grade="8" subject="History" />
            <Grade grade="8" subject="Mathematics" />
            <Grade grade="8" subject="Physics" />
            <Divider sx={{ m: "1.25% 0%" }} />
            <Typography sx={{ bottom: 0 }} variant="caption">
                Attained at <Link href="https://tbshs.org">The Bishop's Stortford High School</Link> in 2019.
            </Typography>
        </Paper>
    );
}
