import { Bio } from "components/pages/about/bio";
import { DynamicButton } from "components/dynamicButton";
import { Experience } from "components/pages/about/experience";
import { FileDownload } from "@mui/icons-material";
import { Qualifications } from "components/pages/about/qualifications";
import type { ReactNode } from "react";
import { Skills } from "components/pages/about/skills";
import Stack from "components/layout/stack";
import { Typography } from "@mui/material";
import { Volunteering } from "components/pages/about/volunteering";

/**
 * This page acts as an online CV.
 * @returns My CV.
 */
export default function About(): ReactNode {
    return (
        <>
            <Stack direction="row">
                <Typography variant="h2" sx={{ flex: 1 }}>About Me</Typography>
                <DynamicButton
                    LinkComponent="a"
                    href="/cv"
                    startIcon={<FileDownload />}
                    sx={{
                        alignSelf: "center",
                        float: "right",
                        m: "1%",
                    }}
                >
                    Download CV
                </DynamicButton>
            </Stack>
            <Bio />
            <Skills />
            <Qualifications />
            <Experience />
            <Volunteering />
        </>
    );
}
