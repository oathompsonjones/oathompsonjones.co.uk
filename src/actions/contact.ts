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
 * @param body - The body of the form, containing the content, email, name, and subject.
 * @param body.content - The content of the email.
 * @param body.email - The email of the sender.
 * @param body.name - The name of the sender.
 * @param body.subject - The subject of the email.
 * @returns An action response.
 */
export async function contact({ content, email, name, subject }: FormSchema): Promise<ActionResponse<undefined>> {
    // Check that the input is in the correct form.
    const safeParse = formSchema.safeParse({ content, email, name, subject });

    if (!safeParse.success)
        return safeParse;

    try {
        // Set up the transporter.
        const transporter = nodemailer.createTransport({
            auth: {
                pass: process.env.EMAIL_AUTH_PASS,
                user: process.env.EMAIL_AUTH_USER,
            },
            service: process.env.EMAIL_SERVICE,
        });

        // Set up the content of the email to be sent to me.
        const text = `New message from ${name} (${email})\n\n${content}`;

        // Send the email to me.
        await transporter.sendMail({
            from: process.env.EMAIL_AUTH_USER,
            subject,
            text,
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
        return {
            error: error instanceof Error ? error : new Error("Failed to send the email."),
            success: false,
        };
    }

    return {
        data: undefined,
        success: true,
    };
}
