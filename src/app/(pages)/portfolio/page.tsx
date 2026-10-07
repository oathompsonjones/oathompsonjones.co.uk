import { Divider, Stack } from "@mui/material";
import { FeaturedProjectsLoader } from "components/pages/portfolio/featuredProjectsLoader";
import type { ReactNode } from "react";
import { RepositoryArchive } from "components/pages/portfolio/repositoryArchive";

/**
 * This page acts as an online portfolio.
 * The static content renders immediately and the GitHub data is fetched in the background.
 * @returns My portfolio, accessed from my GitHub profile.
 */
export default function Portfolio(): ReactNode {
    return (
        <Stack sx={{ gap: 3 }}>
            <FeaturedProjectsLoader />
            <Divider />
            <RepositoryArchive />
        </Stack>
    );
}
