import { ContactForm } from "components/pages/contact/contactForm";
import type { ReactNode } from "react";
import { SocialLinks } from "components/footer/socialLinks";
import { Typography } from "@mui/material";

/**
 * This page provides contact links for me.
 * @returns My contact links, and an email form.
 */
export default function Contact(): ReactNode {
    // Renders the contact page.
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Typography variant="h2">Contact Me</Typography>
            <ContactForm />
            <SocialLinks dividers />
        </div>
    );
}
