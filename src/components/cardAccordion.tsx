"use client";

import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import type { AccordionProps } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import type { ReactNode } from "react";

/**
 * CardAccordion component that serves as a container for the accordion content of the card.
 * @param props - The props for the CardAccordion component.
 * @param props.header - The header text for the accordion.
 * @param props.children - The content of the CardAccordion component.
 * @param props.sx - The sx prop for the CardAccordion component to allow for custom styling.
 * @returns A ReactNode representing the CardAccordion component.
 * @see https://mui.com/material-ui/react-accordion/ for more details on the Accordion component.
 */
export function CardAccordion({ header = "Learn More", children, sx, ...props }: AccordionProps & {
    readonly header?: string;
}): ReactNode {
    return (
        <Accordion
            sx={{
                background: "transparent",
                boxShadow: "none",
                m: "0 -1rem -1rem !important",
                py: "0.5rem",
                width: "calc(100% + 2rem)",
                ...sx,
            }} {...props}
        >
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{header}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
}
