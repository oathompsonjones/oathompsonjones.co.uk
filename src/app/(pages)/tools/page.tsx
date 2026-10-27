import { Stack, Typography } from "@mui/material";
import { BetaChip } from "components/pages/tools/betaChip";
import { Masonry } from "@mui/lab";
import type { ReactNode } from "react";
import { ToolCard } from "components/pages/tools/toolCard";

const plannedTools = [
    {
        description: "Format, validate, and convert JSON into useful data formats.",
        href: "/tools/json",
        name: "JSON Toolkit",
        status: "Available",
    },
    {
        description: "Work with common encodings and generate one-way hashes.",
        href: "/tools/hash-encoding",
        name: "Hash and Encoding",
        status: "Available",
    },
    {
        description: "Explore colour palettes and check accessible contrast.",
        href: "/tools/colour",
        name: "Colour and Contrast",
        status: "Available",
    },
    {
        description: "Write Markdown and preview the rendered result.",
        name: "Markdown Previewer",
        status: "Planned",
    },
    {
        description: "Test regular expressions against sample text.",
        name: "Regex Tester",
        status: "Planned",
    },
    {
        description: "Understand cron expressions field by field.",
        name: "Cron Explainer",
        status: "Planned",
    },
];

/**
 * Introduces the tools collection and previews the first planned utilities.
 * @returns The tools landing page.
 */
export default function Tools(): ReactNode {
    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center", flexWrap: "wrap" }}>
                <Typography component="h1" variant="h2">Tools</Typography>
                <BetaChip />
            </Stack>
            <Stack aria-labelledby="tools-list-heading" spacing={2}>
                <Typography component="h2" id="tools-list-heading" variant="h4">
                    Browse tools
                </Typography>
                <Masonry columns={{ md: 3, sm: 2, xs: 1 }} spacing={2}>
                    {plannedTools.map(({ description, href, name, status }) => (
                        <ToolCard description={description} href={href} key={name} name={name} status={status} />
                    ))}
                </Masonry>
            </Stack>
        </Stack>
    );
}
