"use client";

import { Search } from "@mui/icons-material";
import { Masonry } from "@mui/lab";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Repo, RepoPage } from "actions/github";
import { GitHubRepo } from "components/pages/portfolio/githubRepo";
import { useInfinitePagination } from "hooks/useInfinitePagination";
import type { InfinitePaginationPage } from "hooks/useInfinitePagination";

type RepoPageResponse =
    | {
        data: RepoPage;
        success: true;
    }
    | {
        error: string;
        success: false;
    };

/**
 * Converts a GitHub repository page into the generic page format expected
 * by the infinite pagination hook.
 *
 * @param page - The GitHub repository page.
 * @returns A generic pagination page.
 */
function toPaginationPage(page: RepoPage): InfinitePaginationPage<Repo> {
    return {
        items: page.repos,
        endCursor: page.pageInfo.endCursor,
        hasNextPage: page.pageInfo.hasNextPage,
    };
}

/**
 * Renders an infinite-scroll repository archive.
 * @param props - Component properties.
 * @param props.initialPage - The first server-rendered page of repositories.
 * @returns An element which renders the repository archive.
 */
export function RepositoryArchive({ initialPage }: { initialPage: RepoPage; }): ReactNode {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeSearch, setActiveSearch] = useState("");

    // Fetches a page of repositories from the GitHub API.
    const fetchPage = useCallback(async ({ cursor }: { cursor: string | null; }): Promise<InfinitePaginationPage<Repo>> => {
        const params = new URLSearchParams({ size: "10" });

        if (cursor !== null)
            params.set("after", cursor);

        if (activeSearch !== "")
            params.set("search", activeSearch);

        const response = await fetch(`/api/github/repos?${params.toString()}`);
        const payload = await response.json() as RepoPageResponse;

        if (!response.ok || !payload.success)
            throw new Error(payload.success ? "Failed to load repositories." : payload.error);

        return toPaginationPage(payload.data);
    }, [activeSearch]);

    const { items: repos, hasNextPage, isLoading, error, retry, reset } = useInfinitePagination<Repo>({
        initialPage: toPaginationPage(initialPage),
        fetchPage,
        getItemKey: (repo) => repo.nameWithOwner,
    });

    /**
     * Applies the search after a short debounce.
     *
     * The hook itself remains completely unaware of searching; changing
     * the search simply causes this component to fetch a new first page
     * and reset the pagination state.
     */
    useEffect(() => {
        const timeout = window.setTimeout(async () => {
            const search = searchTerm.trim();

            if (search === activeSearch)
                return;

            setActiveSearch(search);

            try {
                const params = new URLSearchParams({ size: "10" });

                if (search !== "")
                    params.set("search", search);

                const response = await fetch(`/api/github/repos?${params.toString()}`);
                const payload = await response.json() as RepoPageResponse;

                if (!response.ok || !payload.success)
                    throw new Error(payload.success ? "Failed to load repositories." : payload.error);

                reset(toPaginationPage(payload.data));
            } catch { }
        }, 300);

        return (): void => clearTimeout(timeout);
    }, [activeSearch, reset, searchTerm]);

    return (
        <Stack sx={{ gap: 2 }}>
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                sx={{
                    m: "0 0 0 auto",
                    width: { md: 400, xs: "100%" },
                }}
                slotProps={{ input: { endAdornment: (<Search fontSize="small" sx={{ color: "text.secondary" }} />) } }}
            />

            {repos.length === 0 && !isLoading && error === null && (
                <Typography color="text.secondary" variant="caption">
                    No repositories found.
                </Typography>
            )}

            <Masonry columns={{ lg: 4, md: 3, sm: 2, xl: 5, xs: 1 }}>
                {repos.map((repo) => (<GitHubRepo key={repo.nameWithOwner} repo={repo} />))}
            </Masonry>

            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    minHeight: 64,
                }}
            >
                <Typography color="text.secondary" variant="caption">
                    {isLoading
                        ? "Loading more repositories..."
                        : `Showing ${hasNextPage ? "" : "all "}${repos.length} repositories`}
                </Typography>
            </Box>

            {error !== null && (
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", justifyContent: "center" }}>
                    <Typography color="error" variant="caption">{error}</Typography>
                    <Button onClick={retry} size="small" variant="text">Retry</Button>
                </Stack>
            )}
        </Stack>
    );
}
