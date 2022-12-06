import { ALevels, Bio, Experience, GCSEs, Skills, University } from "../Components";
import { Container, Grid, Typography } from "@mui/material";

// TODO: Maybe get this data from LinkedIn, so I don't need to update it here an there?

/**
 * This page acts as an online CV.
 *
 * @returns {JSX.Element} My CV.
 */
export const About = (): JSX.Element => (
    <Container>
        <Typography variant="h2">About Me</Typography>
        <Grid container spacing={2} sx={{ mb: "1rem" }}>
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
