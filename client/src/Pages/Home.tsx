import { Avatar, Button, Container, Divider, Stack, Typography } from "@mui/material";
import { Component } from "react";
import Pfp from "../Images/pfp.jpg";

export class Home extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones";
        return (
            <Container>
                <Stack direction="column" justifyContent="space-evenly" alignItems="center">
                    <Avatar src={Pfp} sx={{ height: "50%", width: "50%" }} />
                    <Typography variant="h2" gutterBottom>Oliver Jones</Typography>
                </Stack>
                <Divider sx={{ bgcolor: "primary.main", margin: "1%" }} />
                <Stack direction={{ sm: "row", xs: "column" }} justifyContent="space-evenly" alignItems="center">
                    <Button variant="contained" size="large" sx={{ margin: "1%" }} href="/about">About Me</Button>
                    <Button variant="contained" size="large" sx={{ margin: "1%" }} href="/contact">Contact Me</Button>
                </Stack>
                <Divider sx={{ bgcolor: "primary.main", margin: "1%" }} />
            </Container>
        );
    }
}
