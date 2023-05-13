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
                    maxHeight: "100%",
                    minHeight: "50%",
                    minWidth: "100%",
                    position: "absolute",
                    top: 0,
                    transform: "translateX(-50%)",
                    width: "auto",
                    zIndex: -1
                }}
            />
            {/* Renders my profile picture and my name. */}
            <Stack alignItems="center" direction="column" justifyContent="space-evenly">
                <Avatar src={GRAVATAR_URL} style={{ height: "25%", width: "25%" }} />
                <Typography gutterBottom variant="h2">Oliver Jones</Typography>
            </Stack>
            {/* Renders buttons which link to my CV and my contact page, wrapped above and below by dividers. */}
            <Divider sx={{ bgcolor: "primary.main", margin: "1%" }} />
            <Stack alignItems="center" direction={{ sm: "row", xs: "column" }} justifyContent="space-evenly">
                <Link href="/about">
                    <Button size="large" variant="contained">About Me</Button>
                </Link>
                <Link href="/contact">
                    <Button size="large" variant="contained">Contact Me</Button>
                </Link>
            </Stack>
            <Divider sx={{ bgcolor: "primary.main", margin: "1%" }} />
        </>
    );
}
