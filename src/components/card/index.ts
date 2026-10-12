"use client";

import { CardAccordion } from "./cardAccordion";
import { CardActionArea } from "./cardActionArea";
import { CardActions } from "./cardActions";
import { CardContent } from "./cardContent";
import { CardHeader } from "./cardHeader";
import { CardMedia } from "./cardMedia";
import type { CardProps } from "@mui/material";
import { CardRoot } from "./cardRoot";
import type { ReactNode } from "react";

type CardComponent = ((props: CardProps) => ReactNode) & {
    Accordion: typeof CardAccordion;
    ActionArea: typeof CardActionArea;
    Actions: typeof CardActions;
    Content: typeof CardContent;
    Header: typeof CardHeader;
    Media: typeof CardMedia;
};

export const Card = Object.assign(CardRoot, {
    Accordion: CardAccordion,
    ActionArea: CardActionArea,
    Actions: CardActions,
    Content: CardContent,
    Header: CardHeader,
    Media: CardMedia,
}) as CardComponent;
