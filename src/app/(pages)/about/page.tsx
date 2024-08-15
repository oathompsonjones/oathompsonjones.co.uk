import { Container, Stack, Typography } from "@mui/material";
import Bio from "./bio";
import Experience from "./experience";
import type { ReactElement } from "react";
import Skills from "./skills";
import DynamicButton from "components/dynamicButton";
import Qualifications from "./qualifications";

/**
 * This page acts as an online CV.
 * @returns My CV.
 */
export default function About(): ReactElement {
    return (
        <Container component="article">
            <Stack direction="row">
                <Typography variant="h2" flex={1}>About Me</Typography>
                <DynamicButton LinkComponent="a" href="/api/cv" sx={{ float: "right", m: "1%" }}>
                    Download CV
                </DynamicButton>
            </Stack>
            <Bio />
            <br />
            <Qualifications />
            <br />
            <Experience />
            <br />
            <Skills />
        </Container>
    );
}
