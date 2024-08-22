import { ContactForm } from "components/pages/contact/contactForm";
import type { ReactElement } from "react";
import { Typography } from "@mui/material";

/**
 * The contact section of the home page.
 * @returns The contact section of the home page.
 */
export function Contact(): ReactElement {
    return (
        <>
            <Typography variant="h1">Contact Me</Typography>
            <ContactForm />
        </>
    );
}
