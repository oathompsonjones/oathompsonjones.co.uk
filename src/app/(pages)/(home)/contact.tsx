"use client";

import { Typography } from "@mui/material";
import type { ReactElement } from "react";
import ContactForm from "pages/contact/contactForm";

/**
 * The contact section of the home page.
 * @returns The contact section of the home page.
 */
export default function Contact(): ReactElement {
    return (
        <>
            <Typography variant="h1">Contact Me</Typography>
            <ContactForm />
        </>
    );
}
