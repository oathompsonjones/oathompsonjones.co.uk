import { Avatar, Button, Container, Divider, Stack, Typography } from "@mui/material";
import Pfp from "../Images/pfp.jpg";

/**
 * This is the home page.
 *
 * @returns {JSX.Element} The home page.
 */
export const Home = (): JSX.Element => <Container>
    {/* Renders my profile picture and my name. */}
    <Stack direction="column" justifyContent="space-evenly" alignItems="center">
        <Avatar src={Pfp} sx={{ height: "50%", width: "50%" }} />
        <Typography variant="h2" gutterBottom>Oliver Jones</Typography>
    </Stack>
    {/* Renders buttons which link to my CV and my contact page, wrapped above and below by dividers. */}
    <Divider sx={{ bgcolor: "primary.main", margin: "1%" }} />
    <Stack direction={{ sm: "row", xs: "column" }} justifyContent="space-evenly" alignItems="center">
        <Button variant="contained" size="large" sx={{ margin: "1%" }} href="/about">About Me</Button>
        <Button variant="contained" size="large" sx={{ margin: "1%" }} href="/contact">Contact Me</Button>
    </Stack>
    <Divider sx={{ bgcolor: "primary.main", margin: "1%" }} />
</Container>;
