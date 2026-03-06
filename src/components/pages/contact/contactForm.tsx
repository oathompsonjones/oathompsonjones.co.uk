"use client";

import { Alert, Button, FormControl, TextField } from "@mui/material";
import type { ActionResponse } from "actions/index";
import { Glass } from "components/glass";
import type { ReactNode } from "react";
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
            <FormControl component="form" action={action} sx={{ display: "contents" }}>
                <Stack spacing={2} direction={{ md: "row", xs: "column" }}>
                    <TextField label="Name" name="name" />
                    <TextField label="Email" name="email" type="email" />
                </Stack>
                <TextField label="Subject" name="subject" />
                <TextField label="Content" name="content" multiline minRows={15} maxRows={30} />
                <Button endIcon={<Send />} type="submit" disabled={pending}>Send</Button>
            </FormControl>
        </Glass>
    );
}
