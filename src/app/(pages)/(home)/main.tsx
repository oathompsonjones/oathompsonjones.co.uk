import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import BackgroundImage from "./backgrounds/image";
import { GRAVATAR_URL } from "utils";
import Link from "next/link";
import Section from "./section";

export default function Main(): React.ReactNode {
    return (
        <Section background={<BackgroundImage />}>
            <Stack alignItems="center" direction="column" justifyContent="center">
                <Avatar src={GRAVATAR_URL} sx={{ height: "auto", width: { lg: "30%", md: "50%", sm: "70%", xs: "90%" } }} />
                <Typography align="center" variant="h1">Oliver Jones</Typography>
                <Typography align="center" variant="h3">BSc Computer Science Undergraduate</Typography>
                <Typography align="center" variant="h4">The University of Edinburgh</Typography>
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
    );
}
