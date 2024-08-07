import ContactForm from "./contactForm";
import type { ReactElement } from "react";
import SocialLinks from "components/socialLinks";
import { Typography } from "@mui/material";

/**
 * This page provides contact links for me.
 *
 * @returns My contact links, and an email form.
 */
export default function Contact(): ReactElement {
    // Renders the contact page.
    return (
        <>
            <Typography variant="h2">Contact Me</Typography>
            <ContactForm />
            <SocialLinks dividers />
        </>
    );
}
