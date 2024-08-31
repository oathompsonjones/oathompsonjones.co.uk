import { Divider, Typography } from "@mui/material";
import { ALevels } from "./alevels";
import { GCSEs } from "./gcses";
import Grid from "components/layout/grid";
import type { ReactNode } from "react";
import { University } from "./university";

/**
 * Contains the Qualifications segment for my CV page.
 * @returns The Qualifications element.
 */
export function Qualifications(): ReactNode {
    return (
        <>
            <Typography variant="h3">Qualifications</Typography>
            <Divider />
            <Grid container spacing={2}>
                <Grid size={{ md: 4, xs: 12 }}>
                    <GCSEs />
                </Grid>
                <Grid size={{ md: 4, xs: 12 }}>
                    <ALevels />
                </Grid>
                <Grid size={{ md: 4, xs: 12 }}>
                    <University />
                </Grid>
            </Grid>
        </>
    );
}
