import { Divider, Typography } from "@mui/material";
import { DynamicButton } from "components/dynamicButton";
import { ProfilePicture } from "./profilePicture";
import type { ReactElement } from "react";
import Stack from "components/layout/stack";

/**
 * The main section of the home page.
 * @returns The main section of the home page.
 */
export function Main(): ReactElement {
    return (
        <>
            <Stack direction="column" sx={{ alignItems: "center", justifyContent: "center" }}>
                <ProfilePicture positioner />
                <Typography align="center" variant="h1">Oliver Jones</Typography>
                <Typography align="center" variant="h3" sx={{ color: "secondary.main" }}>
                    BSc Computer Science Undergraduate
                </Typography>
                <Typography align="center" variant="h4" sx={{ color: "secondary.main" }}>
                    The University of Edinburgh
                </Typography>
            </Stack>
            <Divider flexItem sx={{ bgcolor: "primary.main" }} />
            <Stack direction="row"spacing="1%"sx={{ alignItems: "center", justifyContent: "space-evenly", width: "100%" }}>
                <DynamicButton href="/about" sx={{ pointerEvents: "auto" }}>About Me</DynamicButton>
                <DynamicButton href="/api/cv" sx={{ pointerEvents: "auto" }}>Download CV</DynamicButton>
                <DynamicButton href="/contact" sx={{ pointerEvents: "auto" }}>Contact Me</DynamicButton>
            </Stack>
            <Divider flexItem sx={{ bgcolor: "primary.main" }} />
        </>
    );
}
