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
                    height: "100%",
                    left: "50%",
                    objectFit: "cover",
                    overflow: "hidden",
                    position: "absolute",
                    top: 0,
                    transform: "translateX(-50%)",
                    width: "100%",
                    zIndex: -1
                }}
            />
            <Stack alignItems="center" divider={<Divider flexItem sx={{ bgcolor: "primary.main", m: "1%" }} />}>
                {/* Renders my profile picture and my name. */}
                <Stack alignItems="center" direction="column" justifyContent="space-evenly">
                    <Avatar
                        src={GRAVATAR_URL}
                        sx={{
                            height: { lg: "30%", md: "50%", sm: "70%", xs: "90%" },
                            width: { lg: "30%", md: "50%", sm: "70%", xs: "90%" }
                        }}
                    />
                    <Typography variant="h2">Oliver Jones</Typography>
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
