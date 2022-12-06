import { Alert, Button, Container, Divider, FormControl, FormHelperText, FormLabel, Grid, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import { Email, Facebook, GitHub, Instagram, LinkedIn, Send, Twitter } from "@mui/icons-material";
import type { FormEvent, ReactElement } from "react";
import { Discord } from "../Components";
import axios from "axios";
import { useState } from "react";

/**
 * This page provides contact links for me.
 *
 * @returns {JSX.Element} My contact links, and an email form.
 */
export const Contact = (): JSX.Element => {
    // Creates state variables for the content of the contact form.
    const [content, setContent] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    // Creates a state variable to say whether or not the form has been used (undefined if unused), and if so, if it's been successful (true/false).
    const [status, setStatus] = useState<boolean | undefined>(undefined);

    // Links a URL and an icon for each social media to display.
    const socials: Array<{ icon: ReactElement; link: string; }> = [
        { icon: <GitHub />, link: "/github" },
        { icon: <LinkedIn />, link: "/linkedin" },
        { icon: <Discord />, link: "/discord" },
        { icon: <Twitter />, link: "/twitter" },
        { icon: <Instagram />, link: "/instagram" },
        { icon: <Facebook />, link: "/facebook" },
        { icon: <Email />, link: "/email" }
    ];

    /**
     * Handles form submission.
     *
     * @async
     * @param {FormEvent} event The submit event.
     */
    const handleSubmit = async (event: FormEvent): Promise<void> => {
        // Prevents the default behaviour, which would reload the whole page.
        event.preventDefault();
        // Attempts to submit the form.
        try {
            // Checks that there is content in each of fields.
            if ([content, email, name, subject].includes(""))
                throw new Error();
            // Sends a request to the backend.
            await axios.post("/api/contact", { content, email, name, subject });
            // Clears the fields for each of the fields in the form.
            setContent("");
            setEmail("");
            setName("");
            setSubject("");
            // Sets the form status to true if the form has submitted successfully.
            setStatus(true);
        } catch (err) {
            // Sets the form status to false if the form fails to submit.
            setStatus(false);
        }
    };

    // Renders the contact page.
    return (
        <Container>
            {/* Renders an alert to state whether the form has been submitted. */}
            {status !== undefined && (status
                ? <Alert severity="success">Message sent!</Alert>
                : <Alert severity="error">Message failed to send.</Alert>
            )}
            <Typography variant="h2">Contact Me</Typography>
            {/* Renders the form. */}
            <Paper sx={{ display: "flex", justifyContent: "space-evenly", m: "1%", p: "1%" }}>
                {/* Form control calls handleSubmit when the form is submitted. */}
                <FormControl component="form" onSubmit={(event: FormEvent): void => void handleSubmit(event)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormLabel>Fill out this form to contact me.</FormLabel>
                        </Grid>
                        {/* Renders the name field. */}
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                onChange={(event): void => setName(event.target.value)}
                                required
                                type="text"
                                value={name}
                                variant="filled"
                            />
                        </Grid>
                        {/* Renders the email field. */}
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                onChange={(event): void => setEmail(event.target.value)}
                                required
                                type="email"
                                value={email}
                                variant="filled"
                            />
                        </Grid>
                        {/* Renders the subject field. */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Subject"
                                name="subject"
                                onChange={(event): void => setSubject(event.target.value)}
                                required
                                type="text"
                                value={subject}
                                variant="filled"
                            />
                        </Grid>
                        {/* Renders the content field. */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Content"
                                multiline
                                name="content"
                                onChange={(event): void => setContent(event.target.value)}
                                required
                                rows={15}
                                type="text"
                                value={content}
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormHelperText>*required</FormHelperText>
                        </Grid>
                        {/* Renders teh send (submit) button. */}
                        <Grid item xs={6}>
                            <Button endIcon={<Send />} sx={{ float: "right" }} type="submit" variant="contained">
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </FormControl>
            </Paper>
            {/* Renders icons as links to each social media site. */}
            <Stack alignItems="center" direction="row" divider={<Divider flexItem orientation="vertical" />} justifyContent="space-evenly">
                {socials.map(({ icon, link }, i) => <Link color="inherit" href={link} key={i} sx={{ textDecoration: "none" }}>{icon}</Link>)}
            </Stack>
        </Container>
    );
};
