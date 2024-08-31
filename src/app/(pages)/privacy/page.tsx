import { Container, Typography } from "@mui/material";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "Oliver Jones | Privacy Policy" };

/**
 * This is the privacy policy.
 * @returns The privacy policy.
 */
export default function Privacy(): ReactNode {
    return (
        <Container>
            <Typography variant="h2">
                Privacy Policy
            </Typography>
            <Typography>
                I reserve the right to collect the names and email address of any and all users who
                submit the contact form located <Link href="/contact">here</Link>.
                <br />
                This information will not be shared with any other parties.
                <br />
                This information will only be used to allow me to respond to any enquiries.
            </Typography>
        </Container>
    );
}
