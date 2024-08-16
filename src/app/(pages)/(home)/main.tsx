import { Divider, Stack, Typography } from "@mui/material";
import DynamicButton from "components/dynamicButton";
import ProfilePicture from "./profilePicture";
import type { ReactElement } from "react";

/**
 * The main section of the home page.
 * @returns The main section of the home page.
 */
export default function Main(): ReactElement {
    return (
        <>
            <Stack alignItems="center" direction="column" justifyContent="center">
                <ProfilePicture positioner />
                <Typography align="center" variant="h1">Oliver Jones</Typography>
                <Typography align="center" variant="h3" color="secondary">BSc Computer Science Undergraduate</Typography>
                <Typography align="center" variant="h4" color="secondary">The University of Edinburgh</Typography>
            </Stack>
            <Divider flexItem sx={{ bgcolor: "primary.main" }} />
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-evenly"
                spacing="1%"
                sx={{ width: "100%" }}
            >
                <DynamicButton href="/about" sx={{ pointerEvents: "auto" }}>About Me</DynamicButton>
                <DynamicButton href="/api/cv" sx={{ pointerEvents: "auto" }}>Download CV</DynamicButton>
                <DynamicButton href="/contact" sx={{ pointerEvents: "auto" }}>Contact Me</DynamicButton>
            </Stack>
            <Divider flexItem sx={{ bgcolor: "primary.main" }} />
        </>
    );
}
