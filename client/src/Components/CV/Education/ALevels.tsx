import { Divider, Paper, Stack, Typography } from "@mui/material";
import { Br } from "../../Br";

/**
 * Contains the A-Levels segment for my CV page.
 *
 * @returns {JSX.Element} The ALevels element.
 */
export const ALevels = (): JSX.Element => (
    <Paper sx={{ display: "flex", flexDirection: "column", height: 1, padding: "0.5rem 1rem" }}>
        <Typography variant="h4">A-Levels</Typography>
        <Divider sx={{ margin: "1.25% 0%" }} />
        <Stack direction="row" flexGrow={1}>
            <Typography flexGrow={1}>
                Computer Science    <Br />
                Further Mathematics <Br />
                Mathematics         <Br />
                Physics             <Br />
            </Typography>
            <Typography flexGrow={1}>
                A*  <Br />
                B   <Br />
                A*  <Br />
                A*  <Br />
            </Typography>
        </Stack>
        <Divider sx={{ margin: "1.25% 0%" }} />
        <Typography sx={{ bottom: 0 }} variant="caption">
            Attained at <a href="https://tbshs.org">The Bishop's Stortford High School</a> in 2021.
        </Typography>
    </Paper>
);
