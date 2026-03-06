"use client";

import { Button, Typography } from "@mui/material";
import { Experience } from "components/pages/about/experience";
import { FileDownload } from "@mui/icons-material";
import { Qualifications } from "components/pages/about/qualifications";
import type { ReactNode } from "react";
import { Skills } from "components/pages/about/skills";
import { Stack } from "@mui/system";
import { Summary } from "components/pages/about/summary";
import { Volunteering } from "components/pages/about/volunteering";

/**
 * This page acts as an online CV.
 * @returns My CV.
 */
export default function About(): ReactNode {
    return (
        <Stack gap={2}>
            <Typography variant="h2" align="center" sx={{ flex: 1 }}>
                About Me
            </Typography>
            <Button size="small" LinkComponent="a" href="/cv" startIcon={<FileDownload />} sx={{ alignSelf: "center" }}>
                Download CV
            </Button>
            <Summary />
            <Skills />
            <Qualifications />
            <Experience />
            <Volunteering />
        </Stack>
    );
}
