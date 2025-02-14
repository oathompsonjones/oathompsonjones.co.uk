"use server";

import type { ActionResponse } from ".";
import nodemailer from "nodemailer";
import { z } from "zod";

const formSchema = z.object({
    content: z.string(),
    email: z.string().email(),
    name: z.string(),
    subject: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

/**
 * Sends an email to me.
 * @param _state - The previous state.
 * @param formData - The form data to handle.
 * @returns An action response.
 */
export async function contact(
    _state: ActionResponse<undefined>,
    formData: FormData,
): Promise<ActionResponse<undefined>> {
    try {
        // Check that the input is in the correct form.
        const { content, email, name, subject } = formSchema.parse({
            content: formData.get("content"),
            email: formData.get("email"),
            name: formData.get("name"),
            subject: formData.get("subject"),
        });

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
            to: process.env.EMAIL_AUTH_USER,
        });

        // Send an email to the user.
        await transporter.sendMail({
            from: process.env.EMAIL_AUTH_USER,
            subject: `RE: ${subject}`,
            text: "Thank you for your message, I will get back to you shortly.\n\n" +
                "If you did not attempt to contact me via https://oathompsonjones.co.uk/ " +
                "then please ignore this email.\n\n" +
                "Kind Regards,\nOliver Jones (oathompsonjones@gmail.com)",
            to: email,
        });
    } catch (error) {
        if (error instanceof z.ZodError)
            return { error: new Error("Invalid form data."), success: false };

        return { error: error instanceof Error ? error : new Error("Failed to send the email."), success: false };
    }

    return { data: undefined, success: true };
}
