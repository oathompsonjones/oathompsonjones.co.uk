"use server";

import type { ActionResponse } from ".";
import nodemailer from "nodemailer";
import { z } from "zod";

const formSchema = z.object({
    content: z.string(),
    email: z.string().email(),
    name: z.string(),
    subject: z.string(),
    token: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

/**
 * Sends an email to me.
 * @param _state - The previous state.
 * @param formData - The form data to handle.
 * @returns An action response.
 */
export async function contact(_state: ActionResponse, formData: FormData): Promise<ActionResponse> {
    try {
        // Check that the input is in the correct form.
        const { content, email, name, subject, token } = formSchema.parse({
            content: formData.get("content"),
            email: formData.get("email"),
            name: formData.get("name"),
            subject: formData.get("subject"),
            token: formData.get("token"),
        });

        // Check the recapture token.
        const data = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            body: new URLSearchParams({
                response: token,
                secret: process.env.RECAPTCHA_SECRET,
            }),
            // eslint-disable-next-line @typescript-eslint/naming-convention
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "POST",
        }).then(async (response) => response.json()) as Record<PropertyKey, unknown>;

        if (!("success" in data) || data.success !== true)
            return { error: new Error("Recapture failed."), success: false };

        // Set up the transporter.
        const transporter = nodemailer.createTransport({
            auth: {
                pass: process.env.EMAIL_AUTH_PASS,
                user: process.env.EMAIL_AUTH_USER,
            },
            service: process.env.EMAIL_SERVICE,
        });

        // Send the email to me.
        await transporter.sendMail({
            from: process.env.EMAIL_AUTH_USER,
            subject,
            text: `New message from ${name} (${email})\n\n${content}`,
            to: "oathompsonjones@icloud.com",
        });
    } catch (error) {
        if (error instanceof z.ZodError)
            return { error: new Error("Invalid form data."), success: false };

        return { error: error instanceof Error ? error : new Error("Failed to send the email."), success: false };
    }

    return { data: undefined, success: true };
}
