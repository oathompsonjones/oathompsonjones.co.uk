import Divider from "@mui/material/Divider";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/**
 * Contains the University segment for my CV page.
 *
 * @returns {JSX.Element} The University element.
 */
export default function University(): JSX.Element {
    return (
        <Paper sx={{ display: "flex", flexDirection: "column", height: 1, padding: "0.5rem 1rem" }}>
            <Typography variant="h4">Further Education</Typography>
            <Divider sx={{ margin: "1.25% 0%" }} />
            <Typography flexGrow={1}>
                Currently studying Undergraduate Computer Science at the University of Edinburgh.
            </Typography>
            <Stack direction="row" flexGrow={1}>
                <Stack direction="column" flexGrow={1}>
                    <Typography>1st Year</Typography>
                    <Typography>2nd Year</Typography>
                    <Typography>3rd Year</Typography>
                    <Typography>4th Year</Typography>
                </Stack>
                <Stack direction="column" flexGrow={1}>
                    <Typography>I</Typography>
                    <Typography>TBD</Typography>
                    <Typography>TBD</Typography>
                    <Typography>TBD</Typography>
                </Stack>
            </Stack>
            <Divider sx={{ margin: "1.25% 0%" }} />
            <Typography sx={{ bottom: 0 }} variant="caption">
                Studying at <Link href="https://ed.ac.uk">The University of Edinburgh</Link> since 2021.
            </Typography>
        </Paper>
    );
}
