"use client";
import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import { GitHubRepo } from "./components/githubRepo";
import type { IRepo } from "@/app/api/github";
import { Masonry } from "@mui/lab";
import { useAxios } from "@/hooks/useAxios";

/**
 * This page acts as an online portfolio.
 *
 * @returns {JSX.Element} My portfolio, accessed from my GitHub profile.
 */
export default function Portfolio(): JSX.Element {
    // Calls the backend API to access the repositories from GitHub.
    const [repos] = useAxios<IRepo[]>("/api/github");

    // Renders the portfolio page.
    return (
        <Container>
            <Typography variant="h2">Portfolio</Typography>
            <Typography variant="subtitle1">
                These projects are pulled directly from my <a href="/github">GitHub</a> profile.
            </Typography>
            {
                repos === null ? (
                    <Stack alignItems="center" justifyContent="center">
                        <CircularProgress />
                    </Stack>
                ) : (
                    <Masonry columns={{ lg: 4, md: 3, sm: 2, xs: 1 }}>
                        {repos.map((repo, i) => <GitHubRepo index={i} key={i} repo={repo} />)}
                    </Masonry>
                )
            }
        </Container>
    );
}
