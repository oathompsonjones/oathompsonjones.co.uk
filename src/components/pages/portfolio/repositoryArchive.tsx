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
    const lastUserInteractionRef = useRef<number>(0);

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

            setRepos((current) => {
                const seen = new Set(current.map((r) => r.nameWithOwner));
                const next = payload.data.repos.filter((r) => !seen.has(r.nameWithOwner));

                return [...current, ...next];
            });
            setEndCursor(payload.data.pageInfo.endCursor);
            setHasNextPage(payload.data.pageInfo.hasNextPage);
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Failed to load repositories.");
        } finally {
            setIsLoading(false);
        }
    }, [endCursor, hasNextPage, isLoading]);

    useEffect(() => {
        const mark = (): void => { lastUserInteractionRef.current = Date.now(); };

        window.addEventListener("scroll", mark, { passive: true });
        window.addEventListener("wheel", mark, { passive: true });
        window.addEventListener("touchstart", mark, { passive: true });
        window.addEventListener("keydown", mark, { passive: true });

        return (): void => {
            window.removeEventListener("scroll", mark);
            window.removeEventListener("wheel", mark);
            window.removeEventListener("touchstart", mark);
            window.removeEventListener("keydown", mark);
        };
    }, []);

    const retryLoad = useCallback((): void => {
        loadMore().catch(() => undefined);
    }, [loadMore]);

    /**
     * Checks whether the viewport is currently at the bottom of the page.
     * @returns True when the user has reached the bottom of the page.
     */
    const hasReachedPageBottom = useCallback((): boolean => {
        const root = document.documentElement;
        const threshold = 300;

        return window.scrollY + window.innerHeight >= root.scrollHeight - threshold;
    }, []);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        let observer: IntersectionObserver | null = null;

        if (sentinel !== null) {
            observer = new IntersectionObserver((entries) => {
                const [entry] = entries;

                if (entry?.isIntersecting !== true) 
                    return;

                const root = document.documentElement;
                const pageNotFilled = root.scrollHeight <= window.innerHeight + 1;

                if (pageNotFilled) {
                    retryLoad();
                    return;
                }

                const now = Date.now();
                if (now - lastUserInteractionRef.current < 1500)
                    retryLoad();
            }, { root: null, rootMargin: "200px", threshold: 0 });

            observer.observe(sentinel);
        }

        return (): void => observer?.disconnect();
    }, [hasReachedPageBottom, retryLoad]);

    // Fallback: if intersection observer doesn't fire for small scrolls, use a scroll
    // listener to trigger loading when the sentinel is near the viewport and the user
    // has recently interacted.
    useEffect(() => {
        const onScroll = (): void => {
            const sentinel = sentinelRef.current;
            if (!sentinel || !hasNextPage || isLoading)
                return;

            const rect = sentinel.getBoundingClientRect();
            const nearViewport = rect.top <= window.innerHeight + 250;
            const now = Date.now();

            if (nearViewport && now - lastUserInteractionRef.current < 3000)
                retryLoad();
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return (): void => window.removeEventListener("scroll", onScroll);
    }, [hasNextPage, isLoading, retryLoad]);

    return (
        <Stack sx={{ gap: 2 }}>
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
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", justifyContent: "center" }}>
                    <Typography color="error" variant="caption">{error}</Typography>
                    <Button onClick={retryLoad} size="small" variant="text">Retry</Button>
                </Stack>
            )}
        </Stack>
    );
}
