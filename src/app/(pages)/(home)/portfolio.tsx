import type { ReactElement } from "react";
import Section from "./section";
import { Typography } from "@mui/material";

/**
 * This page displays featured projects.
 * @returns Featured projects.
 */
export default function Portfolio(): ReactElement {
    return (
        <Section>
            <Typography variant="h1">Featured projects</Typography>
        </Section>
    );
}
