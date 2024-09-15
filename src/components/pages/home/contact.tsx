import { ContactForm } from "components/pages/contact/contactForm";
import type { ReactNode } from "react";
import { Typography } from "@mui/material";

/**
 * The contact section of the home page.
 * @returns The contact section of the home page.
 */
export function Contact(): ReactNode {
    return (
        <div className="wrapper">
            <Typography variant="h1">Contact Me</Typography>
            <ContactForm />
        </div>
    );
}
