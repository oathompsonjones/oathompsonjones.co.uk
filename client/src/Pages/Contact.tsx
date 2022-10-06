import { Component, ReactElement } from "react";
import { Container, Divider, FormControl, FormGroup, FormLabel, Grid, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import { Email, Facebook, GitHub, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { Discord } from "../Components";

export class Contact extends Component<{}, { email: string | null; firstName: string | null; lastName: string | null; message: string | null; subject: string | null; }> {
    public constructor(props: {}) {
        super(props);
        this.state = { email: null, firstName: null, lastName: null, message: null, subject: null };
    }

    public render(): JSX.Element {
        document.title = "Oliver Jones | Contact Me";

        const socials: Array<{ icon: ReactElement; link: string; }> = [
            { icon: <GitHub />, link: "/github" },
            { icon: <LinkedIn />, link: "/linkedin" },
            { icon: <Discord />, link: "/discord" },
            { icon: <Twitter />, link: "/twitter" },
            { icon: <Instagram />, link: "/instagram" },
            { icon: <Facebook />, link: "/facebook" },
            { icon: <Email />, link: "/email" }
        ];

        return (
            <Container>
                <Typography variant="h2">Contact Me</Typography>
                <Paper sx={{ alignItems: "center", display: "flex", justifyContent: "space-evenly", m: "1%", p: "1%" }} component={FormControl}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormGroup>
                                <FormLabel>Name</FormLabel>
                                <TextField label="Name" variant="filled" fullWidth />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={6}>
                            <FormGroup>
                                <FormLabel>Email</FormLabel>
                                <TextField label="Email" variant="filled" fullWidth />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Paper>
                <Stack direction={{ lg: "row", sm: "column" }} alignItems="center" justifyContent="space-evenly" divider={<Divider orientation="vertical" flexItem />}>
                    {socials.map(({ icon, link }, i) => <Link key={i} color="inherit" href={link} sx={{ textDecoration: "none" }}>{icon}</Link>)}
                </Stack>
            </Container>
        );
    }
}
