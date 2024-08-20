import { Container, Typography } from "@mui/material";
import { ContactForm } from "./contactForm";
import type { Metadata } from "next";
import type { ReactElement } from "react";
import { SocialLinks } from "components/socialLinks";

export const metadata: Metadata = { title: "Oliver Jones | Contact Me" };

/**
 * This page provides contact links for me.
 *
 * @returns My contact links, and an email form.
 */
export default function Contact(): ReactElement {
    // Renders the contact page.
    return (
        <Container>
            <Typography variant="h2">Contact Me</Typography>
            <ContactForm />
            <SocialLinks dividers />
        </Container>
    );
}
