"use client";

import { ArrowDropDown, FileDownload } from "@mui/icons-material";
import { Button, ButtonGroup, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import type { ReactNode } from "react";
import { Experience } from "components/pages/about/experience";
import { Qualifications } from "components/pages/about/qualifications";
import { Skills } from "components/pages/about/skills";
import { Stack } from "@mui/system";
import { Summary } from "components/pages/about/summary";
import { Volunteering } from "components/pages/about/volunteering";

/**
 * This page acts as an online CV.
 * @returns My CV.
 */
export default function About(): ReactNode {
    const [downloadMenuAnchor, setDownloadMenuAnchor] = useState<HTMLElement | null>(null);

    return (
        <Stack sx={{ gap: 2 }}>
            <Typography variant="h2" align="center" sx={{ flex: 1 }}>
                About Me
            </Typography>
            <ButtonGroup size="small" sx={{ alignSelf: "center" }}>
                <Button LinkComponent="a" href="/cv" startIcon={<FileDownload />}>
                    Download CV
                </Button>
                <Button
                    aria-controls={downloadMenuAnchor === null ? undefined : "cv-download-menu"}
                    aria-expanded={downloadMenuAnchor === null ? undefined : "true"}
                    aria-haspopup="menu"
                    aria-label="More CV download options"
                    onClick={(event) => setDownloadMenuAnchor(event.currentTarget)}
                >
                    <ArrowDropDown />
                </Button>
            </ButtonGroup>
            <Menu
                anchorEl={downloadMenuAnchor}
                id="cv-download-menu"
                onClose={() => setDownloadMenuAnchor(null)}
                open={downloadMenuAnchor !== null}
            >
                <MenuItem component="a" href="/cv?singlePage" onClick={() => setDownloadMenuAnchor(null)}>
                    Download single-page CV
                </MenuItem>
            </Menu>
            <Summary />
            <Skills />
            <Qualifications />
            <Experience />
            <Volunteering />
        </Stack>
    );
}
