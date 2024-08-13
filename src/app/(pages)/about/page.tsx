import { Container, Grid, Stack, Typography } from "@mui/material";
import ALevels from "./alevels";
import Bio from "./bio";
import Experience from "./experience";
import GCSEs from "./gcses";
import type { ReactElement } from "react";
import Skills from "./skills";
import University from "./university";
import DynamicButton from "components/dynamicButton";

/**
 * This page acts as an online CV.
 * @returns My CV.
 */
export default function About(): ReactElement {
    return (
        <Container>
            <Stack direction="row">
                <Typography variant="h2" flex={1}>About Me</Typography>
                <DynamicButton
                    LinkComponent="a"
                    href="/api/cv"
                    sx={{ float: "right", m: "1%" }}
                >
                    Download CV
                </DynamicButton>
            </Stack>
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
        </Container>
    );
}
