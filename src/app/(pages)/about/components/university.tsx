import { Divider, Paper, Stack, Typography } from "@mui/material";
import { Br } from "@/components/br";

/**
 * Contains the University segment for my CV page.
 *
 * @returns {JSX.Element} The University element.
 */
export function University(): JSX.Element {
    return (
        <Paper sx={{ display: "flex", flexDirection: "column", height: 1, padding: "0.5rem 1rem" }}>
            <Typography variant="h4">Further Education</Typography>
            <Divider sx={{ margin: "1.25% 0%" }} />
            <Typography flexGrow={1}>
                Currently studying Undergraduate Computer Science at the University of Edinburgh.
            </Typography>
            <Stack direction="row" flexGrow={1}>
                <Typography flexGrow={1}>
                    1st Year    <Br />
                    2nd Year    <Br />
                    3rd Year    <Br />
                    4th Year    <Br />
                </Typography>
                <Typography flexGrow={1}>
                    I   <Br />
                    TBD <Br />
                    TBD <Br />
                    TBD <Br />
                </Typography>
            </Stack>
            <Divider sx={{ margin: "1.25% 0%" }} />
            <Typography sx={{ bottom: 0 }} variant="caption">
                Studying at <a href="https://ed.ac.uk">The University of Edinburgh</a> since 2021.
            </Typography>
        </Paper>
    );
}
