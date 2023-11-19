"use client";
import { AGE, GRAVATAR_URL } from "utils";
import { Avatar, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Section from "./section";

export default function About(): React.ReactNode {
    return (
        <Section>
            <Stack alignItems="center" direction={{ md: "row-reverse" }} spacing="2rem">
                <Avatar
                    src={GRAVATAR_URL} sx={{
                        height: "auto",
                        maxWidth: "90vh",
                        width: { md: "50%", sm: "70%", xs: "90%" }
                    }}
                />
                <Stack>
                    <Typography variant="h1">Hi, I'm Ollie</Typography>
                    <Typography color="secondary" variant="h4">
                        I'm {AGE()} years old, studying undergraduate Computer Science at the University of Edinburgh.
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
