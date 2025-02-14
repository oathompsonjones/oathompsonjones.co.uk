import { GitHubRepo } from "components/pages/portfolio/githubRepo";
import { Masonry } from "@mui/lab";
import type { ReactNode } from "react";
import { getGithubRepos } from "actions/github";

export const dynamic = "force-dynamic";

/**
 * This page acts as an online portfolio.
 * @returns My portfolio, accessed from my GitHub profile.
 */
export default async function Portfolio(): Promise<ReactNode> {
    // Calls the backend API to access the repositories from GitHub.
    const response = await getGithubRepos();

    if (!response.success)
        throw response.error!;

    // Renders the portfolio page.
    return (
        <Masonry columns={{ lg: 4, md: 3, sm: 2, xl: 5, xs: 1 }}>
            {response.data.map((repo, i) => <GitHubRepo key={i} repo={repo} />)}
        </Masonry>
    );
}
