import ContactForm from "./contactForm";
import SocialLinks from "components/socialLinks";
import { Typography } from "@mui/material";

/**
 * This page provides contact links for me.
 *
 * @returns {React.ReactNode} My contact links, and an email form.
 */
export default function Contact(): React.ReactNode {
    // Renders the contact page.
    return (
        <>
            <Typography variant="h2">Contact Me</Typography>
            <ContactForm />
            <SocialLinks dividers />
        </>
    );
}
