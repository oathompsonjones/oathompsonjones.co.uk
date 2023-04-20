import Config from "@/../Config";
import type { IBody } from "./";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest): Promise<NextResponse> {
    // Check that the input is in the correct form.
    if (req.headers.get("content-type") !== "application/json")
        throw new Error("Invalid form body. Header 'content-type' must be of type 'application/json'.");

    // Get each field from the body.
    const body: unknown = await req.json();
    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/u;
    const validBody = typeof body === "object" &&
        body !== null &&
        Object.keys(body).length === 4 &&
        Object.keys(body).includes("content") &&
        Object.keys(body).includes("email") &&
        Object.keys(body).includes("name") &&
        Object.keys(body).includes("subject") &&
        Object.values(body).every((field) => typeof field === "string" && field !== "") &&
        validEmailRegex.test((body as IBody).email);

    if (!validBody)
        throw new Error("Invalid form body. All fields must contain valid strings.");

    const { content, email, name, subject } = body as IBody;

    // Set up the transporter.
    const transporter = nodemailer.createTransport(Config.email);

    // Set up the content of the email to be sent to me.
    const text = `New message from ${name} (${email})\n\n${content}`;

    // Send the email to me.
    await transporter.sendMail({
        from: Config.email.auth.user,
        subject,
        text,
        to: Config.email.auth.user
    });

    // Send an email to the user.
    await transporter.sendMail({
        from: Config.email.auth.user,
        subject: `RE: ${subject}`,
        text: "Thank you for your message, I will get back to you shortly.\n\n" +
            "If you did not attempt to contact me via https://oathompsonjones.co.uk/ then please ignore this email.\n\n" +
            "Kind Regards,\nOliver Jones (oathompsonjones@gmail.com)",
        to: email
    });

    return NextResponse.json("Success");
}
