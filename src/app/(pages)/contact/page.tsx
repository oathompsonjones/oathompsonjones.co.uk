import { ContactForm } from "components/pages/contact/contactForm";
import type { ReactNode } from "react";
import { SocialLinks } from "components/footer/socialLinks";
import { Typography } from "@mui/material";

/**
 * This page provides contact links for me.
 * @returns My contact links, and an email form.
 */
export default function Contact(): ReactNode {
    return (
        <>
            <Typography variant="h2" align="center" gutterBottom>Contact Me</Typography>
            <ContactForm />
            <br />
            <SocialLinks large />
        </>
    );
}
