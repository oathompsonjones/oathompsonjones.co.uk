import { Button, Grid, Typography } from "@mui/material";
import ALevels from "./alevels";
import Bio from "./bio";
import Experience from "./experience";
import GCSEs from "./gcses";
import Skills from "./skills";
import Spacer from "components/spacer";
import University from "./university";

/**
 * This page acts as an online CV.
 *
 * @returns {JSX.Element} My CV.
 */
export default function About(): JSX.Element {
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
                    variant="contained"
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
