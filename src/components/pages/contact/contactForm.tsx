"use client";

import { Alert, Button, Grid2 as Grid, Paper, Stack, TextField } from "@mui/material";
import type { ChangeEvent, FormEvent, ReactElement } from "react";
import { Send } from "@mui/icons-material";
import { useState } from "react";

/**
 * A contact form.
 * @returns A contact form.
 */
export function ContactForm(): ReactElement {
    // State variables for the content of the contact form.
    const [content, setContent] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    // State variable to say whether or not the form has been used (null if unused), and if so, if it's been successful (true/false).
    const [status, setStatus] = useState<boolean | null>(null);

    /**
     * Handles the submission of the form.
     * @param event - The event that triggered the submission.
     */
    function handleSubmit(event: FormEvent): void {
        // Prevents the default behaviour, which would reload the whole page.
        event.preventDefault();

        // Checks that there is content in each of fields.
        if ([content, email, name, subject].includes("")) {
            setStatus(false);
        } else {
            // Attempts to send the form data to the server.
            fetch("/api/contact", {
                body: JSON.stringify({ content, email, name, subject }),
                // eslint-disable-next-line @typescript-eslint/naming-convention
                headers: { "Content-Type": "application/json" },
                method: "POST",
            }).then(() => {
                // Clears the fields for each of the fields in the form.
                setContent("");
                setEmail("");
                setName("");
                setSubject("");
                // Sets the form status to true if the form has submitted successfully.
                setStatus(true);
            }).catch(() => setStatus(false));
        }
    }

    /**
     * Updates the state of the form.
     * @param event - The event that triggered the update.
     */
    function update(this: "content" | "email" | "name" | "subject", event: ChangeEvent<HTMLTextAreaElement>): void {
        switch (this) {
            case "name":
                setName(event.target.value);
                break;
            case "email":
                setEmail(event.target.value);
                break;
            case "subject":
                setSubject(event.target.value);
                break;
            case "content":
                setContent(event.target.value);
                break;
        }
    }

    const statusBanner = status !== null && (status
        ? (
            <Grid size={12}>
                <Alert severity="success">Message sent!</Alert>
            </Grid>
        )
        : (
            <Grid size={12}>
                <Alert severity="error">Message failed to send.</Alert>
            </Grid>
        )
    );

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                gap: 2,
                height: "100%",
                mb: "1rem",
                p: "1rem",
            }}
        >
            {statusBanner}
            <Stack spacing={2} direction={{ md: "row", xs: "column" }}>
                <TextField label="Name" name="name" onChange={update.bind("name")} value={name} />
                <TextField label="Email" name="email" onChange={update.bind("email")} value={email} type="email" />
            </Stack>
            <TextField label="Subject" name="subject" onChange={update.bind("subject")} value={subject} />
            <TextField
                label="Content" name="content" onChange={update.bind("content")} value={content}
                multiline sx={{
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    "> div": {
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        "> textarea": { flex: 1, height: "100%" },
                        display: "flex",
                        flex: 1,
                        flexDirection: "column",
                        height: "100%",
                    },
                    flex: 1,
                    height: "100%",
                }} />
            <Button endIcon={<Send />} type="submit">Send</Button>
        </Paper>
    );
}
