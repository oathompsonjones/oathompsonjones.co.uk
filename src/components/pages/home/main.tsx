import { Button, Divider, Typography } from "@mui/material";
import { ContactPage, FileDownload, Info } from "@mui/icons-material";
import { ProfilePicture } from "./profilePicture";
import type { ReactNode } from "react";
import Stack from "components/layout/stack";

/**
 * The main section of the home page.
 * @returns The main section of the home page.
 */
export function Main(): ReactNode {
    return (
        <div className="full-width">
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
                <Button
                    href="/about"
                    sx={{ pointerEvents: "auto" }}
                    startIcon={<Info />}
                    size="large"
                >
                    About Me
                </Button>
                <Button
                    LinkComponent="a"
                    href="/cv"
                    sx={{ pointerEvents: "auto" }}
                    startIcon={<FileDownload />}
                    size="large"
                >
                    Download CV
                </Button>
                <Button
                    href="/contact"
                    sx={{ pointerEvents: "auto" }}
                    startIcon={<ContactPage />}
                    size="large"
                >
                    Contact Me
                </Button>
            </Stack>
            <Divider flexItem sx={{ bgcolor: "primary.main" }} />
        </div>
    );
}
