import { Divider, Grid, Typography } from "@mui/material";
import { ALevels } from "./alevels";
import { GCSEs } from "./gcses";
import type { ReactElement } from "react";
import { University } from "./university";

/**
 * Contains the Qualifications segment for my CV page.
 * @returns The Qualifications element.
 */
export function Qualifications(): ReactElement {
    return (
        <>
            <Typography variant="h3">Qualifications</Typography>
            <Divider />
            <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                    <GCSEs />
                </Grid>
                <Grid item md={4} xs={12}>
                    <ALevels />
                </Grid>
                <Grid item md={4} xs={12}>
                    <University />
                </Grid>
            </Grid>
        </>
    );
}
