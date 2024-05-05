import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { GRAVATAR_URL, age } from "utils";
import ContactPage from "pages/contact/page";
import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import Section from "./section";
import desk from "images/desk.jpg";
import BackgroundCursor from "./cursor";

/**
 * This is the home page.
 * @returns The home page.
 */
export default function Home(): ReactElement {
    return (
        <>
            {/* Background */}
            <Box zIndex={-10}>
                <Image
                    alt="Picture of a computer desk."
                    src={desk}
                    style={{ filter: "brightness(50%) opacity(75%)", position: "fixed" }}
                    fill
                />
            </Box>
            <BackgroundCursor />
            {/* Home */}
            <Section>
                <Stack alignItems="center" direction="column" justifyContent="center">
                    <Avatar
                        src={GRAVATAR_URL}
                        sx={{ boxShadow: 20, height: "auto", width: { lg: "30%", md: "50%", sm: "70%", xs: "90%" } }}
                    />
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
            </Section>
            {/* About */}
            <Section>
                <Stack alignItems="center" direction={{ md: "row-reverse" }} spacing="2rem">
                    <Avatar
                        src={GRAVATAR_URL}
                        sx={{ boxShadow: 20, height: "auto", width: { lg: "30%", md: "50%", sm: "70%", xs: "90%" } }}
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
            {/* Contact */}
            <Section>
                <ContactPage />
            </Section>
        </>
    );
}
