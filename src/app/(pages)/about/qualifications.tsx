import type { ReactElement } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import GCSEs from "./gcses";
import ALevels from "./alevels";
import University from "./university";

/**
 * Contains the Qualifications segment for my CV page.
 * @returns The Qualifications element.
 */
export default function Qualifications(): ReactElement {
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
