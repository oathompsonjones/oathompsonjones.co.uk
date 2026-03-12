"use client";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card as MuiCard,
    CardActionArea as MuiCardActionArea,
    CardActions as MuiCardActions,
    CardContent as MuiCardContent,
    CardHeader as MuiCardHeader,
    CardMedia as MuiCardMedia,
    Typography,
} from "@mui/material";
import type {
    AccordionProps,
    CardActionAreaProps,
    CardActionsProps,
    CardContentOwnProps,
    CardHeaderProps,
    CardMediaProps,
    CardProps,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import type { ReactNode } from "react";
import { useGlass } from "hooks/useGlass";

/**
 * Card component that serves as a container for content and actions.
 * @param props - The props for the Card component.
 * @param props.children - The content of the Card component.
 * @returns A ReactNode representing the Card component.
 * @see https://mui.com/material-ui/react-card/ for more details on the Card component.
 */
export function CardRoot({ children, ...props }: CardProps): ReactNode {
    const className = useGlass();

    return (
        <MuiCard className={className} {...props}>
            {children}
        </MuiCard>
    );
}

/**
 * CardMedia component that serves as a container for media content such as images or videos.
 * @param props - The props for the CardMedia component.
 * @returns A ReactNode representing the CardMedia component.
 * @see https://mui.com/material-ui/react-card/#complex-interaction for more details on the CardMedia component.
 */
export function CardMedia(props: CardMediaProps): ReactNode {
    return (<MuiCardMedia sx={{ m: "-1rem -1rem 0", width: "calc(100% + 2rem)" }} {...props} />);
}

/**
 * CardHeader component that serves as a container for the header content of the card.
 * @param props - The props for the CardHeader component.
 * @returns A ReactNode representing the CardHeader component.
 * @see https://mui.com/material-ui/react-card/#complex-interaction for more details on the CardHeader component.
 */
export function CardHeader(props: CardHeaderProps): ReactNode {
    return (<MuiCardHeader {...props} />);
}

/**
 * CardContent component that serves as a container for the main content of the card.
 * @param props - The props for the CardContent component.
 * @param props.children - The content of the CardContent component.
 * @returns A ReactNode representing the CardContent component.
 * @see https://mui.com/material-ui/react-card/#complex-interaction for more details on the CardContent component.
 */
export function CardContent({ children, ...props }: CardContentOwnProps): ReactNode {
    return (
        <MuiCardContent {...props}>
            {children}
        </MuiCardContent>
    );
}

/**
 * CardActions component that serves as a container for the actions of the card.
 * @param props - The props for the CardActions component.
 * @param props.children - The content of the CardActions component.
 * @returns A ReactNode representing the CardActions component.
 * @see https://mui.com/material-ui/react-card/#complex-interaction for more details on the CardActions component.
 */
export function CardActions({ children, ...props }: CardActionsProps): ReactNode {
    return (
        <MuiCardActions {...props}>
            {children}
        </MuiCardActions>
    );
}

/**
 * CardActionArea component that serves as a container for the action area of the card.
 * @param props - The props for the CardActionArea component.
 * @param props.children - The content of the CardActionArea component.
 * @returns A ReactNode representing the CardActionArea component.
 * @see https://mui.com/material-ui/react-card/#complex-interaction for more details on the CardActionArea component.
 */
export function CardActionArea({ children, ...props }: CardActionAreaProps): ReactNode {
    return (
        <MuiCardActionArea {...props}>
            {children}
        </MuiCardActionArea>
    );
}

/**
 * CardAccordion component that serves as a container for the accordion content of the card.
 * @param props - The props for the CardAccordion component.
 * @param props.header - The header text for the accordion.
 * @param props.children - The content of the CardAccordion component.
 * @returns A ReactNode representing the CardAccordion component.
 * @see https://mui.com/material-ui/react-accordion/ for more details on the Accordion component.
 */
export function CardAccordion({ header = "Learn More", children, ...props }: AccordionProps & {
    header?: string;
}): ReactNode {
    return (
        <Accordion
            sx={{
                background: "transparent",
                boxShadow: "none",
                m: "0 -1rem -1rem !important",
                py: "0.5rem",
                width: "calc(100% + 2rem)",
            }} {...props}>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{header}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
}
