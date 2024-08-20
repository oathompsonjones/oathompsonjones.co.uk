import { Container, Stack, Typography } from "@mui/material";
import { Bio } from "./bio";
import { DynamicButton } from "components/dynamicButton";
import { Experience } from "./experience";
import type { Metadata } from "next";
import { Qualifications } from "./qualifications";
import type { ReactElement } from "react";
import { Skills } from "./skills";

export const metadata: Metadata = { title: "Oliver Jones | About Me" };

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
            <br />
            <Qualifications />
            <br />
            <br />
            <Experience />
            <br />
            <br />
            <Skills />
        </Container>
    );
}
