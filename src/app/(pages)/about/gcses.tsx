import Divider from "@mui/material/Divider";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/**
 * Contains the GCSEs segment for my CV page.
 *
 * @returns {JSX.Element} The GCSEs element.
 */
export default function GCSEs(): JSX.Element {
    return (
        <Paper sx={{ display: "flex", flexDirection: "column", height: 1, padding: "0.5rem 1rem" }}>
            <Typography variant="h4">GCSEs</Typography>
            <Divider sx={{ margin: "1.25% 0%" }} />
            <Stack direction="row" flexGrow={1}>
                <Stack direction="column" flexGrow={1}>
                    <Typography>Biology</Typography>
                    <Typography>Chemistry</Typography>
                    <Typography>Computer Science</Typography>
                    <Typography>English Language</Typography>
                    <Typography>English Literature</Typography>
                    <Typography>French</Typography>
                    <Typography>History</Typography>
                    <Typography>Mathematics</Typography>
                    <Typography>Physics</Typography>
                </Stack>
                <Stack direction="column" flexGrow={1}>
                    <Typography>8</Typography>
                    <Typography>7</Typography>
                    <Typography>8</Typography>
                    <Typography>8</Typography>
                    <Typography>7</Typography>
                    <Typography>7</Typography>
                    <Typography>8</Typography>
                    <Typography>8</Typography>
                    <Typography>8</Typography>
                </Stack>
            </Stack>
            <Divider sx={{ margin: "1.25% 0%" }} />
            <Typography sx={{ bottom: 0 }} variant="caption">
                Attained at <Link href="https://tbshs.org">The Bishop's Stortford High School</Link> in 2019.
            </Typography>
        </Paper>
    );
}
