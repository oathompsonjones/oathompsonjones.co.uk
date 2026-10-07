"use client";

import { ArrowDropDown, FileDownload } from "@mui/icons-material";
import { Button, ButtonGroup, Menu, MenuItem, Typography } from "@mui/material";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
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
    const buttonGroupRef = useRef<HTMLDivElement>(null);
    const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
    const handleDownloadMenuOpen = useCallback((): void => setDownloadMenuOpen(true), []);
    const handleDownloadMenuClose = useCallback((): void => setDownloadMenuOpen(false), []);

    // Scrolling is not locked while the menu is open, so close it when the page scrolls instead.
    useEffect(() => {
        if (!downloadMenuOpen)
            return (): void => { /* Nothing to clean up. */ };

        window.addEventListener("scroll", handleDownloadMenuClose, { passive: true });

        return (): void => window.removeEventListener("scroll", handleDownloadMenuClose);
    }, [downloadMenuOpen, handleDownloadMenuClose]);

    return (
        <Stack sx={{ gap: 2 }}>
            <Typography align="center" sx={{ flex: 1 }} variant="h2">
                About Me
            </Typography>
            <ButtonGroup ref={buttonGroupRef} size="small" sx={{ alignSelf: "center" }}>
                <Button LinkComponent="a" href="/cv" startIcon={<FileDownload />}>
                    Download CV
                </Button>
                <Button
                    aria-controls={downloadMenuOpen ? "cv-download-menu" : undefined}
                    aria-expanded={downloadMenuOpen ? "true" : undefined}
                    aria-haspopup="menu"
                    aria-label="More CV download options"
                    onClick={handleDownloadMenuOpen}
                >
                    <ArrowDropDown />
                </Button>
            </ButtonGroup>
            <Menu
                anchorEl={buttonGroupRef.current}
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                disableScrollLock
                id="cv-download-menu"
                onClose={handleDownloadMenuClose}
                open={downloadMenuOpen}
                slotProps={{ list: { disablePadding: true } }}
                transformOrigin={{ horizontal: "center", vertical: "top" }}
            >
                <MenuItem component="a" href="/cv?singlePage" onClick={handleDownloadMenuClose}>
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
