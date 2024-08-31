"use client";

import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import type { ReactNode } from "react";

/**
 * Handles errors for the page.
 * @param props - The component properties.
 * @param props.error - The error that occurred.
 * @param props.reset - The function to reset the application.
 * @returns An error element.
 */
export function PageError({ error, reset }: { error: Error; reset: () => void; }): ReactNode {
    return (
        <Accordion sx={{ background: "none", boxShadow: "none" }}>
            <AccordionSummary>
                <Typography variant="h4" sx={{ flex: 1 }}>An error occurred, please try again later.</Typography>
                <Button onClick={reset} size="small">Try Again</Button>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{error.message}</Typography>
            </AccordionDetails>
        </Accordion>
    );
}
