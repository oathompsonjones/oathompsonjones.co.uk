"use client";
import { Container, Typography } from "@mui/material";
import { ContactForm } from "./contactForm";
import { SocialLinks } from "@/components/socialLinks";

/**
 * This page provides contact links for me.
 *
 * @returns {JSX.Element} My contact links, and an email form.
 */
export default function Contact(): JSX.Element {
    // Renders the contact page.
    return (
        <Container>
            <Typography variant="h2">Contact Me</Typography>
            <ContactForm />
            <SocialLinks dividers />
        </Container>
    );
}
