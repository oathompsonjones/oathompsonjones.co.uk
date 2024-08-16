"use client";

import { Alert, Button, FormControl, FormLabel, Grid, Paper, TextField } from "@mui/material";
import type { FormEvent, ReactElement } from "react";
import { useEffect, useState } from "react";
import { Send } from "@mui/icons-material";
import useWindowSize from "hooks/useWindowSize";

/**
 * A contact form.
 * @returns A contact form.
 */
export default function ContactForm(): ReactElement {
    // State variables for the content of the contact form.
    const [content, setContent] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    // State variable to say whether or not the form has been used (null if unused), and if so, if it's been successful (true/false).
    const [status, setStatus] = useState<boolean | null>(null);

    /**
     * Handles the submission of the form.
     * @param event - The form event.
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
            await fetch("/api/contact", {
                body: JSON.stringify({ content, email, name, subject }),
                // eslint-disable-next-line @typescript-eslint/naming-convention
                headers: { "Content-Type": "application/json" },
                method: "POST",
            });

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

    // Calculates the number of rows for the content field.
    const { height } = useWindowSize();
    const [contentRows, setContentRows] = useState(1);

    useEffect(() => {
        const field = document.querySelector("textarea[name=content]")!;
        const lineHeight = parseFloat(getComputedStyle(field).lineHeight);

        setContentRows(Math.floor(height / lineHeight / 2.5));
    }, []);

    return (
        <Paper sx={{ display: "flex", mb: "1rem", p: "1rem" }}>
            {/* Form control calls handleSubmit when the form is submitted. */}
            <FormControl
                component="form" onSubmit={(event: FormEvent): void => {
                    void handleSubmit(event);
                }} sx={{ flex: 1 }}>
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
                            rows={contentRows}
                            type="text"
                            value={content}
                            variant="filled"
                        />
                    </Grid>
                    {/* Renders the send (submit) button. */}
                    <Grid item xs={12}>
                        <Button endIcon={<Send />} sx={{ float: "right" }} type="submit">
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </FormControl>
        </Paper>
    );
}
