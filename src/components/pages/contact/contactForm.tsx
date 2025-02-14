"use client";

import { Alert, Button, FormControl, Paper, TextField } from "@mui/material";
import type { ActionResponse } from "actions/index";
import type { ReactNode } from "react";
import { Send } from "@mui/icons-material";
import Stack from "components/layout/stack";
import { contact } from "actions/contact";
import { useActionState } from "react";

/**
 * A contact form.
 * @returns A contact form.
 */
export function ContactForm(): ReactNode {
    const [state, action, pending] = useActionState<ActionResponse<undefined>, FormData>(contact, {
        error: null,
        success: false,
    });

    return (
        <Paper sx={{ display: "flex", flexDirection: "column", gap: 2, my: "auto", p: "1rem" }}>
            {state.success
                ? <Alert severity="success">Message sent!</Alert>
                : state.error !== null && <Alert severity="error">Message failed to send.</Alert>}
            <FormControl component="form" action={action} sx={{ display: "contents" }}>
                <Stack spacing={2} direction={{ md: "row", xs: "column" }}>
                    <TextField label="Name" name="name" />
                    <TextField label="Email" name="email" type="email" />
                </Stack>
                <TextField label="Subject" name="subject" />
                <TextField label="Content" name="content" multiline minRows={15} maxRows={30} />
                <Button endIcon={<Send />} type="submit" disabled={pending}>Send</Button>
            </FormControl>
        </Paper>
    );
}
