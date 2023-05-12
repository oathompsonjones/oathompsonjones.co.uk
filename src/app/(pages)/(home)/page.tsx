import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { GRAVATAR_URL } from "utils";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/**
 * This is the home page.
 *
 * @returns {JSX.Element} The home page.
 */
export default function Home(): JSX.Element {
    return (
        <>
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
