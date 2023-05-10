"use client";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import type { FormEvent } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Send from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
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
        <Paper sx={{ display: "flex", justifyContent: "space-evenly", m: "1%", p: "1%" }}>
            {/* Form control calls handleSubmit when the form is submitted. */}
            <FormControl component="form" onSubmit={(event: FormEvent): void => void handleSubmit(event)}>
                <Grid container spacing={2}>
                    {/* Renders an alert to state whether the form has been submitted. */}
                    <Grid item xs={12}>
                        {status !== null && (status
                            ? <Alert severity="success">Message sent!</Alert>
                            : <Alert severity="error">Message failed to send.</Alert>
                        )}
                    </Grid>
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
                    {/* Renders the send (submit) button. */}
                    <Grid item xs={6}>
                        <Button endIcon={<Send />} sx={{ float: "right" }} type="submit" variant="contained">
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </FormControl>
        </Paper>
    );
}
