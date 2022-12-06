import { Avatar, Button, Container, Divider, Stack, Typography } from "@mui/material";
import Pfp from "../Images/pfp.jpg";

/**
 * This is the home page.
 *
 * @returns {JSX.Element} The home page.
 */
export const Home = (): JSX.Element => (
    <Container>
        {/* Renders my profile picture and my name. */}
        <Stack alignItems="center" direction="column" justifyContent="space-evenly">
            <Avatar src={Pfp} sx={{ height: "50%", width: "50%" }} />
            <Typography gutterBottom variant="h2">Oliver Jones</Typography>
        </Stack>
        {/* Renders buttons which link to my CV and my contact page, wrapped above and below by dividers. */}
        <Divider sx={{ bgcolor: "primary.main", margin: "1%" }} />
        <Stack alignItems="center" direction={{ sm: "row", xs: "column" }} justifyContent="space-evenly">
            <Button href="/about" size="large" sx={{ margin: "1%" }} variant="contained">About Me</Button>
            <Button href="/contact" size="large" sx={{ margin: "1%" }} variant="contained">Contact Me</Button>
        </Stack>
        <Divider sx={{ bgcolor: "primary.main", margin: "1%" }} />
    </Container>
);
