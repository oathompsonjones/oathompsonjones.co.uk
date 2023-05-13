import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import { GRAVATAR_URL } from "utils";
import Image from "next/image";
import Link from "next/link";
import desk from "images/desk.jpg";

/**
 * This is the home page.
 *
 * @returns {JSX.Element} The home page.
 */
export default function Home(): JSX.Element {
    return (
        <>
            <Image
                alt="Picture of a computer desk."
                src={desk}
                style={{
                    filter: "brightness(50%)",
                    height: "auto",
                    left: "50%",
                    minHeight: "50%",
                    minWidth: "100%",
                    overflow: "hidden",
                    position: "fixed",
                    top: 0,
                    transform: "translateX(-50%)",
                    width: "auto",
                    zIndex: -1
                }}
            />
            <Stack alignItems="center" divider={<Divider flexItem sx={{ bgcolor: "primary.main", m: "1%" }} />}>
                {/* Renders my profile picture and my name. */}
                <Stack alignItems="center" direction="column" justifyContent="space-evenly">
                    <Avatar src={GRAVATAR_URL} style={{ height: "25%", width: "25%" }} />
                    <Typography gutterBottom variant="h2">Oliver Jones</Typography>
                </Stack>
                {/* Renders buttons which link to my CV and my contact page. */}
                <Stack
                    alignItems="center"
                    direction={{ sm: "row", xs: "column" }}
                    justifyContent="space-evenly"
                    sx={{ width: "100%" }}
                >
                    <Button
                        LinkComponent={Link}
                        href="/about"
                        size="large"
                        sx={{ m: "0.5%" }}
                        variant="contained"
                    >
                        About Me
                    </Button>
                    <Button
                        LinkComponent={Link}
                        href="/contact"
                        size="large"
                        sx={{ m: "0.5%" }}
                        variant="contained"
                    >
                        Contact Me
                    </Button>
                </Stack>
                <div />
            </Stack>
        </>
    );
}
