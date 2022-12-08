import type { Request, Response } from "express";
import Config from "../Config";
import type { IBody } from "../../../typings";
import nodemailer from "nodemailer";

export function requestHandler(req: Request<unknown, unknown, IBody>, res: Response): void {
    // Check that the input is in the correct form.
    if (req.get("content-type") !== "application/json")
        return void res.sendStatus(500);

    // Get each field from the body.
    const { content, email, name, subject } = req.body;

    // Make sure each field exists and is a string.
    if (
        ![typeof content, typeof email, typeof name, typeof subject].every((type) => type === "string") ||
        [content, email, name, subject].includes("")
    )
        return void res.sendStatus(500);

    // Check the user's email is valid
    // eslint-disable-next-line no-control-regex
    const validEmailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/u;
    if (!validEmailRegex.test(email))
        return void res.sendStatus(500);

    // Set up the transporter.
    const transporter = nodemailer.createTransport(Config.email);

    // Set up the content of the email to be sent to me.
    const text = `New message from ${name} (${email})\n\n${content}`;

    // Send the email to me.
    transporter.sendMail({
        from: Config.email.auth.user,
        subject,
        text,
        to:   Config.email.auth.user
    }, (error) => {
        if (error !== null) {
            console.log(error);
            // Tell the user that the email failed.
            return void res.sendStatus(500);
        }
        // Send an email to the user.
        return transporter.sendMail({
            from:    Config.email.auth.user,
            subject: `RE: ${subject}`,
            text:    "Thank you for your message, I will get back to you shortly.\n\nIf you did not attempt to contact me via https://oathompsonjones.co.uk/ then please ignore this email.\n\nKind Regards,\nOliver Jones (oathompsonjones@gmail.com)",
            to:      email
        }, (err) => {
            if (err !== null) {
                console.log(error);
                // Tell the user that the email failed.
                return void res.sendStatus(500);
            }
            // Tell the user that the email succeeded.
            return void res.sendStatus(200);
        });
    });
}