import Box from "components/layout/box";
import { ContactForm } from "components/pages/contact/contactForm";
import type { ReactElement } from "react";
import { Typography } from "@mui/material";

/**
 * The contact section of the home page.
 * @returns The contact section of the home page.
 */
export function Contact(): ReactElement {
    return (
        <Box sx={{ display: "flex", flex: 1, flexDirection: "column", height: "100%" }}>
            <Typography variant="h1">Contact Me</Typography>
            <ContactForm />
        </Box>
    );
}
