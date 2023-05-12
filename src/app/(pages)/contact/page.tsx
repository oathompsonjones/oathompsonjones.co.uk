import ContactForm from "./contactForm";
import SocialLinks from "components/socialLinks";
import { Typography } from "@mui/material";

/**
 * This page provides contact links for me.
 *
 * @returns {JSX.Element} My contact links, and an email form.
 */
export default function Contact(): JSX.Element {
    // Renders the contact page.
    return (
        <>
            <Typography variant="h2">Contact Me</Typography>
            <ContactForm />
            <SocialLinks dividers />
        </>
    );
}
