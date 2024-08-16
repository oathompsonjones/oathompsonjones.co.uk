"use client";

import { GitHubRepo } from "./githubRepo";
import Link from "next/link";
import { Masonry } from "@mui/lab";
import type { ReactElement } from "react";
import type { Repo } from "api/github/route";
import { Typography } from "@mui/material";
import { useFetch } from "hooks/useFetch";

/**
 * This page acts as an online portfolio.
 * @returns My portfolio, accessed from my GitHub profile.
 */
export default function Portfolio(): ReactElement {
    // Calls the backend API to access the repositories from GitHub.
    const repos = useFetch<Repo[]>("/api/github");

    // Renders the portfolio page.
    return (
        <>
            <Typography variant="subtitle1">
                These projects are pulled directly from my <Link href="/github" prefetch={false}>GitHub</Link> profile.
            </Typography>
            <Masonry columns={{ lg: 4, md: 3, sm: 2, xl: 5, xs: 1 }}>
                {(repos ?? []).map((repo, i) => <GitHubRepo key={i} repo={repo} />)}
            </Masonry>
        </>
    );
}
