"use client";

import { Button, Divider, Stack, Typography } from "@mui/material";
import type { ReactElement } from "react";
import ProfilePicture from "./profilePicture";
import Link from "next/link";
import FadingDiv from "./fadingDiv";

/**
 * A div which will be used to either fade in or out.
 * @param children - The children.
 * @returns A div.
 */
export default function Main(): ReactElement {
    return (
        <FadingDiv>
            <Stack alignItems="center" direction="column" justifyContent="center">
                <ProfilePicture positioner />
                <Typography align="center" variant="h1">Oliver Jones</Typography>
                <Typography align="center" variant="h3" color="secondary">BSc Computer Science Undergraduate</Typography>
                <Typography align="center" variant="h4" color="secondary">The University of Edinburgh</Typography>
            </Stack>
            <Divider flexItem sx={{ bgcolor: "primary.main", m: "1%" }} />
            <Stack
                alignItems="center"
                direction={{ sm: "row", xs: "column" }}
                justifyContent="space-evenly"
                spacing="1%"
                sx={{ width: "100%" }}
            >
                <Button LinkComponent={Link} href="/about" size="large">About Me</Button>
                <Button LinkComponent="a" href="/api/cv" size="large">Download CV</Button>
                <Button LinkComponent={Link} href="/contact" size="large">Contact Me</Button>
            </Stack>
            <Divider flexItem sx={{ bgcolor: "primary.main", m: "1%" }} />
        </FadingDiv>
    );
}
