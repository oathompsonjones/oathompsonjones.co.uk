import { Divider, Paper, Typography } from "@mui/material";
import Grade from "./grade";
import Link from "next/link";

/**
 * Contains the University segment for my CV page.
 *
 * @returns The University element.
 */
export default function University(): React.ReactElement {
    return (
        <Paper sx={{ display: "flex", flexDirection: "column", height: "100%", p: "2%" }}>
            <Typography variant="h4">Further Education</Typography>
            <Divider sx={{ m: "1.25% 0%" }} />
            <Typography>
                Currently studying Undergraduate Computer Science at the University of Edinburgh.
            </Typography>
            <Grade grade="I" subject="1st Year" />
            <Grade grade="II.i" subject="2nd Year" />
            <Grade grade="TBD" subject="3rd Year" />
            <Grade grade="TBD" subject="4th Year" />
            <Grade grade="TBD" subject="Final Grade" />
            <Divider sx={{ m: "1.25% 0%" }} />
            <Typography sx={{ bottom: 0 }} variant="caption">
                Studying at <Link href="https://ed.ac.uk">The University of Edinburgh</Link> since 2021. Set to graduate in 2025.
            </Typography>
        </Paper>
    );
}
