import { Alert, Button, Container, Divider, FormControl, FormHelperText, FormLabel, Grid, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import { Component, FormEvent, ReactElement } from "react";
import { Email, Facebook, GitHub, Instagram, LinkedIn, Send, Twitter } from "@mui/icons-material";
import { Discord } from "../Components";
import axios from "axios";

export class Contact extends Component<{}, { content: string; email: string; name: string; status?: boolean; subject: string; }> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            content: "",
            email: "",
            name: "",
            subject: ""
        };
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
                {this.state.status !== undefined && (this.state.status
                    ? <Alert severity="success">Message sent!</Alert>
                    : <Alert severity="error">Message failed to send.</Alert>
                )}
                <Typography variant="h2">Contact Me</Typography>
                <Paper sx={{ display: "flex", justifyContent: "space-evenly", m: "1%", p: "1%" }}>
                    <FormControl component="form" onSubmit={this._handleSubmit.bind(this)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Alert severity="info">This feature is not fully implemented yet.</Alert>
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel>Fill out this form to contact me.</FormLabel>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="name"
                                    label="Name"
                                    type="text"
                                    variant="filled"
                                    value={this.state.name}
                                    onChange={(event): void => void this.setState({ name: event.target.value })}
                                    fullWidth
                                    required
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="email"
                                    label="Email"
                                    type="email"
                                    variant="filled"
                                    value={this.state.email}
                                    onChange={(event): void => void this.setState({ email: event.target.value })}
                                    fullWidth
                                    required
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="subject"
                                    label="Subject"
                                    type="text"
                                    variant="filled"
                                    value={this.state.subject}
                                    onChange={(event): void => void this.setState({ subject: event.target.value })}
                                    fullWidth
                                    required
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="content"
                                    label="Content"
                                    type="text"
                                    variant="filled"
                                    value={this.state.content}
                                    onChange={(event): void => void this.setState({ content: event.target.value })}
                                    fullWidth
                                    required
                                    multiline
                                    rows={15}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormHelperText>*required</FormHelperText>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" type="submit" endIcon={<Send />} sx={{ float: "right" }} disabled>
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Paper>
                <Stack direction="row" alignItems="center" justifyContent="space-evenly" divider={<Divider orientation="vertical" flexItem />}>
                    {socials.map(({ icon, link }, i) => <Link key={i} color="inherit" href={link} sx={{ textDecoration: "none" }}>{icon}</Link>)}
                </Stack>
            </Container>
        );
    }

    private async _handleSubmit(event: FormEvent): Promise<void> {
        event.preventDefault();
        try {
            await axios.post("/api/contact", this.state);
            this.setState({
                content: "",
                email: "",
                name: "",
                status: true,
                subject: ""
            });
        } catch (err) {
            this.setState({
                status: false
            });
        }
    }
}
