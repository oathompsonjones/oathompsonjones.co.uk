"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import type { InstagramPage } from "actions/instagram";
import { InstagramPost } from "components/pages/gallery/instagramPost";
import { Masonry } from "@mui/lab";

type InstagramPageResponse =
    | {
        data: InstagramPage;
        success: true;
    }
    | {
        error: string;
        success: false;
    };

/**
 * Renders a gallery archive with infinite scrolling.
 * @param props - Component properties.
 * @param props.initialPage - The first server-rendered page of posts.
 * @returns A client-side archive with incremental loading.
 */
export function InstagramArchive({ initialPage }: { initialPage: InstagramPage; }): ReactNode {
    const [posts, setPosts] = useState<InstagramPage["posts"]>(initialPage.posts);
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

            const response = await fetch(`/api/instagram/posts?${params.toString()}`);
            const payload = await response.json() as InstagramPageResponse;

            if (!response.ok || !payload.success)
                throw new Error(payload.success ? "Failed to load posts." : payload.error);

            setPosts((current) => {
                const seen = new Set(current.map((post) => post.id));
                const next = payload.data.posts.filter((post) => !seen.has(post.id));

                return [...current, ...next];
            });
            setEndCursor(payload.data.pageInfo.endCursor);
            setHasNextPage(payload.data.pageInfo.hasNextPage);
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Failed to load posts.");
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
        if (!hasNextPage)
            return (): void => undefined;

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
    }, [hasNextPage, hasReachedPageBottom, retryLoad]);

    const images = posts.map((post) => <InstagramPost key={post.id} post={post} />);

    const imageCount = posts.reduce((count, post) => {
        if ("mediaType" in post) {
            if (post.mediaType === "CAROUSEL_ALBUM")
                return count + post.children.length;
        } else if (post.media_type === "CAROUSEL_ALBUM") {
            return count + post.children.data.length;
        }

        return count + 1;
    }, 0);

    return (
        <Stack gap={2}>
            <Masonry columns={{ lg: 5, md: 4, sm: 3, xl: 6, xs: 1 }}>{images}</Masonry>

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
                        ? "Loading more posts..."
                        : `Showing ${hasNextPage ? "" : "all "}${posts.length} posts (${imageCount} images)`}
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
