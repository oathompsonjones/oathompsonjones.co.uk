import { Divider, Paper, Stack, Typography } from "@mui/material";
import { Br } from "@/components/br";
import Link from "next/link";

/**
 * Contains the GCSEs segment for my CV page.
 *
 * @returns {JSX.Element} The GCSEs element.
 */
export function GCSEs(): JSX.Element {
    return (
        <Paper sx={{ display: "flex", flexDirection: "column", height: 1, padding: "0.5rem 1rem" }}>
            <Typography variant="h4">GCSEs</Typography>
            <Divider sx={{ margin: "1.25% 0%" }} />
            <Stack direction="row" flexGrow={1}>
                <Typography flexGrow={1}>
                    Biology             <Br />
                    Chemistry           <Br />
                    Computer Science    <Br />
                    English Language    <Br />
                    English Literature  <Br />
                    French              <Br />
                    History             <Br />
                    Mathematics         <Br />
                    Physics             <Br />
                </Typography>
                <Typography flexGrow={1}>
                    8   <Br />
                    7   <Br />
                    8   <Br />
                    8   <Br />
                    7   <Br />
                    7   <Br />
                    8   <Br />
                    8   <Br />
                    8   <Br />
                </Typography>
            </Stack>
            <Divider sx={{ margin: "1.25% 0%" }} />
            <Typography sx={{ bottom: 0 }} variant="caption">
                Attained at <Link href="https://tbshs.org">The Bishop's Stortford High School</Link> in 2019.
            </Typography>
        </Paper>
    );
}
