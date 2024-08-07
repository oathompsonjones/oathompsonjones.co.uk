import { Button, Grid, Typography } from "@mui/material";
import ALevels from "./alevels";
import Bio from "./bio";
import Experience from "./experience";
import GCSEs from "./gcses";
import type { ReactElement } from "react";
import Skills from "./skills";
import Spacer from "components/spacer";
import University from "./university";

/**
 * This page acts as an online CV.
 * @returns My CV.
 */
export default function About(): ReactElement {
    return (
        <>
            <div style={{ display: "flex" }}>
                <Typography variant="h2">About Me</Typography>
                <Spacer />
                <Button
                    LinkComponent="a"
                    href="/api/cv"
                    size="large"
                    sx={{ float: "right", m: "1%" }}
                >
                    Download CV
                </Button>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Bio />
                </Grid>
                <Grid item md={4} xs={12}>
                    <GCSEs />
                </Grid>
                <Grid item md={4} xs={12}>
                    <ALevels />
                </Grid>
                <Grid item md={4} xs={12}>
                    <University />
                </Grid>
                <Grid item xs={12}>
                    <Experience />
                </Grid>
                <Grid item xs={12}>
                    <Skills />
                </Grid>
            </Grid>
        </>
    );
}
