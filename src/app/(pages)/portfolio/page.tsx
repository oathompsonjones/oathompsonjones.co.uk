import { Divider, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { RepositoryArchive } from "components/pages/portfolio/repositoryArchive";
import { getGithubReposPage } from "actions/github";

export const dynamic = "force-dynamic";

/**
 * This page acts as an online portfolio.
 * @returns My portfolio, accessed from my GitHub profile.
 */
export default async function Portfolio(): Promise<ReactNode> {
    // Server-render the first page so the archive has content immediately.
    const response = await getGithubReposPage();

    if (!response.success)
        throw response.error!;

    return (
        <Stack gap={3}>
            <Stack gap={2}>
                <Typography variant="h4">Featured Projects</Typography>
                <Typography color="text.secondary">
                    A curated view of projects that best represent my engineering strengths.
                </Typography>
                <Stack direction={{ md: "row", xs: "column" }} gap={2}>

                </Stack>
            </Stack>

            <Divider />

            <Stack gap={2}>
                <Typography variant="h4">Repository Archive</Typography>
                <RepositoryArchive initialPage={response.data} />
            </Stack>
        </Stack>
    );
}
