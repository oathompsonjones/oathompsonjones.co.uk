"use client";

import { Alert, Button, FormControl, TextField } from "@mui/material";
import type { ActionResponse } from "actions/index";
import { Glass } from "components/glass";
import type { ReactNode } from "react";
import { Recaptcha } from "../privacy/recaptcha";
import { Send } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { contact } from "actions/contact";
import { useActionState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

/**
 * A contact form.
 * @returns A contact form.
 */
export function ContactForm(): ReactNode {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const onSubmit = async (state: ActionResponse, formData: FormData): Promise<ActionResponse> => {
        const token = await executeRecaptcha?.("contact");

        if (token !== undefined)
            formData.append("token", token);

        return contact(state, formData);
    };

    const [state, action, pending] = useActionState<ActionResponse, FormData>(onSubmit, {
        error: null,
        success: false,
    });

    return (
        <Glass sx={{ display: "flex", flexDirection: "column", gap: 2, my: "auto" }}>
            {state.success
                ? <Alert severity="success">Message sent!</Alert>
                : state.error !== null && <Alert severity="error">Message failed to send.</Alert>}
            <FormControl action={action} component="form" sx={{ display: "contents" }}>
                <Stack direction={{ md: "row", xs: "column" }} spacing={2}>
                    <TextField fullWidth label="Name" name="name" required />
                    <TextField fullWidth label="Email" name="email" required type="email" />
                </Stack>
                <TextField label="Subject" name="subject" required />
                <TextField label="Content" maxRows={30} minRows={15} multiline name="content" required />
                <Recaptcha align="center" variant="caption" />
                <Button disabled={pending} endIcon={<Send />} type="submit">Send</Button>
            </FormControl>
        </Glass>
    );
}
