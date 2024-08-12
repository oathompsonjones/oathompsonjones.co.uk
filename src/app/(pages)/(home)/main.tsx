import { Divider, Stack, Typography } from "@mui/material";
import type { ReactElement } from "react";
import ProfilePicture from "./profilePicture";
import DynamicButton from "components/dynamicButton";

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
            <Divider flexItem sx={{ bgcolor: "primary.main", m: "1%" }} />
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-evenly"
                spacing="1%"
                sx={{ width: "100%" }}
            >
                <DynamicButton href="/about" sx={{ pointerEvents: "auto" }}>About Me</DynamicButton>
                <DynamicButton LinkComponent="a" href="/api/cv" sx={{ pointerEvents: "auto" }}>Download CV</DynamicButton>
                <DynamicButton href="/contact" sx={{ pointerEvents: "auto" }}>Contact Me</DynamicButton>
            </Stack>
            <Divider flexItem sx={{ bgcolor: "primary.main", m: "1%" }} />
        </>
    );
}
