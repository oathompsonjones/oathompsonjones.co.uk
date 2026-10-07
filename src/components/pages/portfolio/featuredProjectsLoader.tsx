"use client";

import { FEATURED_REPOSITORIES, FeaturedProjects } from "components/pages/portfolio/featuredProjects";
import { useEffect, useState } from "react";
import type { FeaturedProject } from "components/pages/portfolio/featuredProjects";
import type { ReactNode } from "react";
import { getGithubReposByName } from "actions/github";

/**
 * Renders the featured projects immediately with their static content, then
 * fills in the GitHub data once it has been fetched.
 * @returns The featured project cards.
 */
export function FeaturedProjectsLoader(): ReactNode {
    const [projects, setProjects] = useState<FeaturedProject[]>();

    useEffect(() => {
        let cancelled = false;

        void getGithubReposByName(FEATURED_REPOSITORIES.map(({ repository }) => repository)).then((response) => {
            if (cancelled || !response.success)
                return;

            setProjects(response.data.map((repo, index) => ({
                description: FEATURED_REPOSITORIES[index]!.description,
                name: FEATURED_REPOSITORIES[index]!.name,
                repo,
            })));
        });

        return (): void => {
            cancelled = true;
        };
    }, []);

    return <FeaturedProjects {...projects === undefined ? {} : { projects }} />;
}
