import { Button, Typography } from "@mui/material";
import { ContactForm } from "components/pages/contact/contactForm";
import Grid from "components/layout/grid";
import type { GridSize } from "@mui/material";
import Link from "next/link";
import type { ReactNode } from "react";
import { socials } from "components/footer/socialLinks";

/**
 * This page provides contact links for me.
 * @returns My contact links, and an email form.
 */
export default function Contact(): ReactNode {
    const getSize = (size: "lg" | "md" | "sm" | "xs", index: number): GridSize => {
        const lineLength = { lg: 5, md: 4, sm: 3, xs: 2 }[size];

        return index >= socials.length - socials.length % lineLength
            ? "grow"
            : socials.length / lineLength;
    };

    // Renders the contact page.
    return (
        <>
            <Typography variant="h2">Contact Me</Typography>
            <ContactForm />
            <Grid container spacing={1} columns={socials.length}>
                {socials.map(({ icon, label, link }, i) => (
                    <Grid key={i} size={(["xs", "sm", "md", "lg"] as const).map((size) => getSize(size, i))}>
                        <Button
                            LinkComponent={Link}
                            href={link}
                            startIcon={icon}
                            color="inherit"
                            variant="text"
                            sx={{ display: "flex" }}
                        >
                            {label}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
