import { Button, Typography, Zoom } from "@mui/material";
import { Card } from "components/card";
import type { ReactNode } from "react";

/**
 * Renders a card for an article.
 * @param props - An object containing the component props.
 * @param props.title - The title (and link) of the article.
 * @param props.summary - A summary of the article.
 * @param props.image - An image to display for the article.
 * @returns An element which renders an article card.
 */
export function Article({ title, summary, image }: { title: string; summary: string; image?: string; }): ReactNode {
    return (
        <Zoom in timeout={500}>
            <Card>
                {image !== undefined && <Card.Media
                    component="img"
                    image={image}
                    style={{
                        margin: "-1rem -1rem 0",
                        width: "calc(100% + 2rem)",
                    }}
                />}
                <Card.Content>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body1">{summary}</Typography>
                </Card.Content>
                <Card.Actions>
                    <Button
                        color="primary"
                        variant="text"
                        href={`/articles/${title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                        Read more
                    </Button>
                </Card.Actions>
            </Card>
        </Zoom>
    );
}
