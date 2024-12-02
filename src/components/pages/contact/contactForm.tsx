"use client";

import { Alert, Button, Paper, TextField } from "@mui/material";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { Send } from "@mui/icons-material";
import Stack from "components/layout/stack";
import { contact } from "actions/contact";
import { useWindowSize } from "hooks/useWindowSize";

/**
 * A contact form.
 * @returns A contact form.
 */
export function ContactForm(): ReactNode {
    // Handles the content of the contact form.
    const [content, setContent] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    // Handles the success status of the form.
    const [status, setStatus] = useState<boolean | null>(null);

    const { height } = useWindowSize();
    const [contentRows, setContentRows] = useState(1);

    useEffect(() => {
        const field = document.querySelector("textarea[name=content]")!;
        const lineHeight = parseFloat(getComputedStyle(field).lineHeight);

        setContentRows(Math.floor(height / lineHeight / 3));
    }, [height]);

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
            contact({ content, email, name, subject }).then(({ success }) => {
                // Checks if the form submission was successful.
                if (!success) {
                    setStatus(false);

                    return;
                }

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

    const statusBanner = status !== null && (status
        ? (<Alert severity="success">Message sent!</Alert>)
        : (<Alert severity="error">Message failed to send.</Alert>)
    );

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: "1rem",
            }}
        >
            {statusBanner}
            <Stack spacing={2} direction={{ md: "row", xs: "column" }}>
                <TextField
                    label="Name"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <TextField
                    label="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                />
            </Stack>
            <TextField
                label="Subject"
                name="subject"
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
            />
            <TextField
                label="Content"
                name="content"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                multiline
                rows={Math.min(Math.max(5, contentRows), 30)}
            />
            <Button endIcon={<Send />} type="submit">Send</Button>
        </Paper>
    );
}
