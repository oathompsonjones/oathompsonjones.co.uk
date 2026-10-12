"use client";

import { Button, Chip, Typography } from "@mui/material";
import { Card } from "components/card";
import type { ReactNode } from "react";

type ToolCardProps = {
    readonly description: string;
    readonly href?: string | undefined;
    readonly name: string;
    readonly status: string;
};

/**
 * Displays a single tool in the tools collection.
 * @param props - The component props.
 * @param props.description - A short description of the tool.
 * @param props.href - The link to the tool, if available.
 * @param props.name - The name of the tool being displayed.
 * @param props.status - The availability status of the tool.
 * @returns A tool card.
 */
export function ToolCard({ description, href, name, status }: ToolCardProps): ReactNode {
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                minHeight: 150,
                p: 2,
            }}
            variant="outlined"
        >
            <Card.Header
                subheader={(
                    <Chip
                        color={status === "Available" ? "success" : "default"}
                        label={status}
                        size="small"
                    />
                )}
                title={name}
            />
            <Card.Content>
                <Typography color="text.secondary">{description}</Typography>
            </Card.Content>
            <Card.Actions>
                {href !== undefined && (
                    <Button href={href} size="small" sx={{ width: "100%" }} variant="contained">
                        Open
                    </Button>
                )}
            </Card.Actions>
        </Card>
    );
}
