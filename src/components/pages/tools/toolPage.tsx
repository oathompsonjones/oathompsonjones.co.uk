import { Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

/**
 * Provides a consistent heading and responsive content container for a tool.
 * @param props - The tool page content.
 * @param props.children - Tool-specific controls and output.
 * @param props.description - A concise explanation of the tool.
 * @param props.title - The page heading.
 * @returns The shared tool page shell.
 */
export function ToolPage({
    children,
    description,
    title,
}: {
    readonly children: ReactNode;
    readonly description: string;
    readonly title: string;
}): ReactNode {
    return (
        <Stack component="article" spacing={3} sx={{ marginInline: "auto", maxWidth: "72rem", width: "100%" }}>
            <Stack spacing={1}>
                <Typography component="h1" variant="h2">{title}</Typography>
                <Typography color="text.secondary">{description}</Typography>
            </Stack>
            {children}
        </Stack>
    );
}
