"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import type { Repo, RepoPage } from "actions/github";
import { GitHubRepo } from "components/pages/portfolio/githubRepo";
import { Masonry } from "@mui/lab";

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
 * Renders an infinite-scroll repository archive.
 * @param props - Component properties.
 * @param props.initialPage - The first server-rendered page of repositories.
 * @returns A client-side archive with incremental loading.
 */
export function RepositoryArchive({ initialPage }: { initialPage: RepoPage; }): ReactNode {
    const [repos, setRepos] = useState<Repo[]>(initialPage.repos);
    const [endCursor, setEndCursor] = useState<string | null>(initialPage.pageInfo.endCursor);
    const [hasNextPage, setHasNextPage] = useState<boolean>(initialPage.pageInfo.hasNextPage);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const loadMore = useCallback(async (): Promise<void> => {
        if (!hasNextPage || isLoading || endCursor === null)
            return;

        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({ after: endCursor });

            const response = await fetch(`/api/github/repos?${params.toString()}`);
            const payload = await response.json() as RepoPageResponse;

            if (!response.ok || !payload.success)
                throw new Error(payload.success ? "Failed to load repositories." : payload.error);

            setRepos((current) => [...current, ...payload.data.repos]);
            setEndCursor(payload.data.pageInfo.endCursor);
            setHasNextPage(payload.data.pageInfo.hasNextPage);
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Failed to load repositories.");
        } finally {
            setIsLoading(false);
        }
    }, [endCursor, hasNextPage, isLoading]);

    const retryLoad = useCallback((): void => {
        loadMore().catch(() => undefined);
    }, [loadMore]);

    /**
     * Checks whether the viewport is currently at the bottom of the page.
     * @returns True when the user has reached the bottom of the page.
     */
    const hasReachedPageBottom = useCallback((): boolean => {
        const root = document.documentElement;
        const threshold = 100;

        return window.scrollY + window.innerHeight >= root.scrollHeight - threshold;
    }, []);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        let observer: IntersectionObserver | null = null;

        if (sentinel !== null) {
            observer = new IntersectionObserver((entries) => {
                const [entry] = entries;

                if (entry?.isIntersecting === true && hasReachedPageBottom())
                    retryLoad();
            }, { root: null, rootMargin: "0px", threshold: 1 });

            observer.observe(sentinel);
        }

        return (): void => observer?.disconnect();
    }, [hasReachedPageBottom, retryLoad]);

    return (
        <Stack gap={2}>
            <Masonry columns={{ lg: 4, md: 3, sm: 2, xl: 5, xs: 1 }}>
                {repos.map((repo, i) => <GitHubRepo key={`${repo.nameWithOwner}-${i}`} repo={repo} />)}
            </Masonry>

            <Box
                ref={sentinelRef}
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
                        : `Showing ${repos.length} of ${initialPage.totalCount} repositories`}
                </Typography>
            </Box>

            {error !== null && (
                <Stack alignItems="center" direction="row" justifyContent="center" spacing={1.5}>
                    <Typography color="error" variant="caption">{error}</Typography>
                    <Button onClick={retryLoad} size="small" variant="text">Retry</Button>
                </Stack>
            )}
        </Stack>
    );
}
