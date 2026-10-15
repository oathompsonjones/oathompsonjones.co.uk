import { Stack, Typography } from "@mui/material";
import { Glass } from "components/glass";
import type { ReactNode } from "react";
import { useId } from "react";

/**
 * Provides a labelled semantic section for a tool's input, settings, or result.
 * @param props - The section content.
 * @param props.children - Section contents.
 * @param props.glass - Whether to wrap the section in a glass surface.
 * @param props.title - The visible section heading.
 * @returns A labelled tool section.
 */
export function ToolSection({ children, glass = true, title }: Readonly<{
    children: ReactNode;
    glass?: boolean;
    title?: string;
}>): ReactNode {
    const headingId = useId();
    const section = (
        <Stack aria-labelledby={headingId} component="section" spacing={1.5}>
            <Typography component="h2" id={headingId} variant="h5">{title}</Typography>
            {children}
        </Stack>
    );

    return glass ? <Glass sx={{ p: 2 }}>{section}</Glass> : section;
}
