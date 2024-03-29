"use client";

import { Avatar, Stack, Typography } from "@mui/material";
import { GRAVATAR_URL, age } from "utils";
import Link from "next/link";
import type { ReactElement } from "react";
import Section from "./section";

/**
 * This page displays information about me.
 * @returns Information about me.
 */
export default function About(): ReactElement {
    return (
        <Section>
            <Stack alignItems="center" direction={{ md: "row-reverse" }} spacing="2rem">
                <Avatar
                    src={GRAVATAR_URL} sx={{
                        height: "auto",
                        maxWidth: "90vh",
                        width: { md: "50%", sm: "70%", xs: "90%" },
                    }}
                />
                <Stack>
                    <Typography variant="h1">Hi, I'm Ollie</Typography>
                    <Typography color="secondary" variant="h4">
                        I'm {age()} years old, studying undergraduate Computer Science at the University of Edinburgh.
                        I have a passion for programming, which stems from a love of solving problems.
                        I direct that passion towards writing high quality code, creating efficient and robust solutions
                        to the problems presented to me.
                        Take a look at my CV <Link href="/about">here</Link>.
                    </Typography>
                </Stack>
            </Stack>
        </Section>
    );
}
