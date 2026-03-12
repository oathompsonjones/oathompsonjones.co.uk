import {
    CardAccordion,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    CardRoot,
} from "components/card.client";
import type { CardProps } from "@mui/material";
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
