import { ContactPage, FileDownload, Info } from "@mui/icons-material";
import { Divider, Typography } from "@mui/material";
import { DynamicButton } from "components/dynamicButton";
import { ProfilePicture } from "./profilePicture";
import type { ReactNode } from "react";
import Stack from "components/layout/stack";

/**
 * The main section of the home page.
 * @returns The main section of the home page.
 */
export function Main(): ReactNode {
    return (
        <>
            <Stack direction="column" sx={{ alignItems: "center", justifyContent: "center" }}>
                <ProfilePicture positioner />
                <Typography align="center" variant="h1">Oliver Jones</Typography>
                <Typography align="center" variant="h3" sx={{ color: "secondary.main" }}>
                    BSc Computer Science
                </Typography>
                <Typography align="center" variant="h4" sx={{ color: "secondary.main" }}>
                    The University of Edinburgh
                </Typography>
            </Stack>
            <Divider flexItem sx={{ bgcolor: "primary.main" }} />
            <Stack
                direction={{ sm: "row", xs: "column" }}
                spacing="1%"
                sx={{ alignItems: "center", justifyContent: "space-evenly", width: "100%" }}
            >
                <DynamicButton href="/about" sx={{ pointerEvents: "auto" }} startIcon={<Info />}>
                    About Me
                </DynamicButton>
                <DynamicButton LinkComponent="a" href="/cv" sx={{ pointerEvents: "auto" }} startIcon={<FileDownload />}>
                    Download CV
                </DynamicButton>
                <DynamicButton href="/contact" sx={{ pointerEvents: "auto" }} startIcon={<ContactPage />}>
                    Contact Me
                </DynamicButton>
            </Stack>
            <Divider flexItem sx={{ bgcolor: "primary.main" }} />
        </>
    );
}
