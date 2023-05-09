import Divider from "@mui/material/Divider";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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
            <Stack direction="row" flexGrow={1}>
                <Stack direction="column" flexGrow={1}>
                    <Typography>Computer Science</Typography>
                    <Typography>Further Mathematics</Typography>
                    <Typography>Mathematics</Typography>
                    <Typography>Physics</Typography>
                </Stack>
                <Stack direction="column" flexGrow={1}>
                    <Typography>A*</Typography>
                    <Typography>B</Typography>
                    <Typography>A*</Typography>
                    <Typography>A*</Typography>
                </Stack>
            </Stack>
            <Divider sx={{ margin: "1.25% 0%" }} />
            <Typography sx={{ bottom: 0 }} variant="caption">
                Attained at <Link href="https://tbshs.org">The Bishop's Stortford High School</Link> in 2021.
            </Typography>
        </Paper>
    );
}
