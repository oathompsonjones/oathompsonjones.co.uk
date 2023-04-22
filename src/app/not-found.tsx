"use client";
import { Container, Typography } from "@mui/material";

/**
 * Handles any 404 errors.
 *
 * @returns {JSX.Element} An error page.
 */
export default function Error(): JSX.Element {
    return (
        <Container>
            <Typography gutterBottom variant="h2">Error 404 - Page not found</Typography>
            <Typography variant="subtitle1">
                These aren't the droids you're looking for. Click <a href="/">here</a> to go to the homepage.
            </Typography>
        </Container>
    );
}
