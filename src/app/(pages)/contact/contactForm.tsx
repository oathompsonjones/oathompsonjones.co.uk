"use client";
import { Alert, Button, FormControl, FormHelperText, FormLabel, Grid, Paper, TextField } from "@mui/material";
import type { FormEvent } from "react";
import { Send } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";

export default function ContactForm(): JSX.Element {
    // State variables for the content of the contact form.
    const [content, setContent] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    // State variable to say whether or not the form has been used (null if unused), and if so, if it's been successful (true/false).
    const [status, setStatus] = useState<boolean | null>(null);

    /**
     * Handles form submission.
     *
     * @async
     * @param {FormEvent} event The submit event.
     */
    async function handleSubmit(event: FormEvent): Promise<void> {
        // Prevents the default behaviour, which would reload the whole page.
        event.preventDefault();
        // Attempts to submit the form.
        try {
            // Checks that there is content in each of fields.
            if ([content, email, name, subject].includes(""))
                throw new Error("Invalid form body. All fields must have a value.");
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
    }

    return (
        <Paper sx={{ display: "flex", m: "1%", p: "1%" }}>
            {/* Form control calls handleSubmit when the form is submitted. */}
            <FormControl component="form" onSubmit={(event: FormEvent): void => void handleSubmit(event)} sx={{ flex: 1 }}>
                <Grid container spacing={2}>
                    {/* Renders an alert to state whether the form has been submitted. */}
                    {status !== null && (status
                        ? (
                            <Grid item xs={12}>
                                <Alert severity="success">Message sent!</Alert>
                            </Grid>
                        )
                        : (
                            <Grid item xs={12}>
                                <Alert severity="error">Message failed to send.</Alert>
                            </Grid>
                        )
                    )}
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
                            rows={18}
                            type="text"
                            value={content}
                            variant="filled"
                        />
                    </Grid>
                    {/* Renders the send (submit) button. */}
                    <Grid item xs={9}>
                        <FormHelperText>Fields marked * are required.</FormHelperText>
                    </Grid>
                    <Grid item xs={3}>
                        <Button endIcon={<Send />} sx={{ float: "right" }} type="submit" variant="contained">
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </FormControl>
        </Paper>
    );
}
