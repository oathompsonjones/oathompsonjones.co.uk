import { Alert, Button, Container, Divider, FormControl, FormHelperText, FormLabel, Grid, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import { Email, Facebook, GitHub, Instagram, LinkedIn, Send, Twitter } from "@mui/icons-material";
import { FormEvent, ReactElement, useState } from "react";
import { Discord } from "../Components";
import axios from "axios";

export const Contact = (): JSX.Element => {
    document.title = "Oliver Jones | Contact Me";

    const [content, setContent] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [status, setStatus] = useState<boolean | undefined>(undefined);

    const socials: Array<{ icon: ReactElement; link: string; }> = [
        { icon: <GitHub />, link: "/github" },
        { icon: <LinkedIn />, link: "/linkedin" },
        { icon: <Discord />, link: "/discord" },
        { icon: <Twitter />, link: "/twitter" },
        { icon: <Instagram />, link: "/instagram" },
        { icon: <Facebook />, link: "/facebook" },
        { icon: <Email />, link: "/email" }
    ];

    const handleSubmit = async (event: FormEvent): Promise<void> => {
        event.preventDefault();
        try {
            if ([content, email, name, subject].includes("")) throw new Error();
            await axios.post("/api/contact", { content, email, name, subject });
            setContent("");
            setEmail("");
            setName("");
            setStatus(true);
            setSubject("");
        } catch (err) {
            setStatus(false);
        }
    };

    return <Container>
        {status !== undefined && (status
            ? <Alert severity="success">Message sent!</Alert>
            : <Alert severity="error">Message failed to send.</Alert>
        )}
        <Typography variant="h2">Contact Me</Typography>
        <Paper sx={{ display: "flex", justifyContent: "space-evenly", m: "1%", p: "1%" }}>
            <FormControl component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormLabel>Fill out this form to contact me.</FormLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="name"
                            label="Name"
                            type="text"
                            variant="filled"
                            value={name}
                            onChange={(event): void => setName(event.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            variant="filled"
                            value={email}
                            onChange={(event): void => setEmail(event.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="subject"
                            label="Subject"
                            type="text"
                            variant="filled"
                            value={subject}
                            onChange={(event): void => setSubject(event.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="content"
                            label="Content"
                            type="text"
                            variant="filled"
                            value={content}
                            onChange={(event): void => setContent(event.target.value)}
                            fullWidth
                            required
                            multiline
                            rows={15}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormHelperText>*required</FormHelperText>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" type="submit" endIcon={<Send />} sx={{ float: "right" }}>
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </FormControl>
        </Paper>
        <Stack direction="row" alignItems="center" justifyContent="space-evenly" divider={<Divider orientation="vertical" flexItem />}>
            {socials.map(({ icon, link }, i) => <Link key={i} color="inherit" href={link} sx={{ textDecoration: "none" }}>{icon}</Link>)}
        </Stack>
    </Container>;
};