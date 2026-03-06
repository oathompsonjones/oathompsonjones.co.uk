"use client";

import {
    Button,
    Card, CardActions, CardContent, CardMedia,
    Typography,
    Zoom,
} from "@mui/material";
import type { ReactNode } from "react";
import { useGlass } from "hooks/useGlass";

/**
 * Renders a card for an article.
 * @param props - An object containing the component props.
 * @param props.title - The title (and link) of the article.
 * @param props.summary - A summary of the article.
 * @param props.image - An image to display for the article.
 * @returns An element which renders an article card.
 */
export function Article({ title, summary, image }: { title: string; summary: string; image?: string; }): ReactNode {
    const className = useGlass();

    return (
        <Zoom in timeout={500}>
            <Card className={className}>
                {image !== undefined && <CardMedia
                    component="img"
                    image={image}
                    style={{
                        margin: "-1rem -1rem 0",
                        width: "calc(100% + 2rem)",
                    }}
                />}
                <CardContent>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body1">{summary}</Typography>
                </CardContent>
                <CardActions>
                    <Button
                        color="primary"
                        variant="text"
                        href={`/articles/${title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                        Read more
                    </Button>
                </CardActions>
            </Card>
        </Zoom>
    );
}
