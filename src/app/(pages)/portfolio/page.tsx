import { Divider, Stack } from "@mui/material";
import type { ReactNode } from "react";
import { FeaturedProjects, FEATURED_REPOSITORIES } from "components/pages/portfolio/featuredProjects";
import { RepositoryArchive } from "components/pages/portfolio/repositoryArchive";
import { getGithubReposByName, getGithubReposPage } from "actions/github";

export const dynamic = "force-dynamic";

/**
 * This page acts as an online portfolio.
 * @returns My portfolio, accessed from my GitHub profile.
 */
export default async function Portfolio(): Promise<ReactNode> {
    // Server-render the first page so the archive has content immediately.
    const [response, featuredResponse] = await Promise.all([
        getGithubReposPage(),
        getGithubReposByName(FEATURED_REPOSITORIES.map(({ repository }) => repository)),
    ]);

    if (!response.success)
        throw response.error!;

    const featuredProjects = featuredResponse.success
        ? featuredResponse.data.map((repo, index) => ({
            description: FEATURED_REPOSITORIES[index]!.description,
            name: FEATURED_REPOSITORIES[index]!.name,
            repo,
        }))
        : [];

    return (
        <Stack sx={{ gap: 3 }}>
            <FeaturedProjects projects={featuredProjects} />

            <Divider />

            <Stack sx={{ gap: 2 }}>
                <RepositoryArchive initialPage={response.data} />
            </Stack>
        </Stack>
    );
}
