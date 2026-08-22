"use client";

import { Masonry } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import type { ReactNode } from "react";
import type { InstagramPage } from "actions/instagram";
import { InstagramPost } from "components/pages/gallery/instagramPost";
import { useInfinitePagination } from "hooks/useInfinitePagination";
import type { InfinitePaginationPage } from "hooks/useInfinitePagination";

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
 * Converts an Instagram page into the generic page format expected by the
 * infinite pagination hook.
 *
 * @param page - The Instagram page.
 * @returns A generic pagination page.
 */
function toPaginationPage(
    page: InstagramPage,
): InfinitePaginationPage<InstagramPage["posts"][number]> {
    return {
        items: page.posts,
        endCursor: page.pageInfo.endCursor,
        hasNextPage: page.pageInfo.hasNextPage,
    };
}

/**
 * Renders a gallery archive with infinite scrolling.
 * @param props - Component properties.
 * @param props.initialPage - The first server-rendered page of posts.
 * @returns A client-side archive with incremental loading.
 */
export function InstagramArchive({ initialPage }: { initialPage: InstagramPage; }): ReactNode {
    type Post = InstagramPage["posts"][number];

    // Fetches the next page of Instagram posts.
    const fetchPage = useCallback(async ({ cursor }: { cursor: string | null; }): Promise<InfinitePaginationPage<Post>> => {
        if (cursor === null)
            return toPaginationPage(initialPage);

        const params = new URLSearchParams({ after: cursor });

        const response = await fetch(`/api/instagram/posts?${params.toString()}`);
        const payload = await response.json() as InstagramPageResponse;

        if (!response.ok || !payload.success)
            throw new Error(payload.success ? "Failed to load posts." : payload.error);

        return toPaginationPage(payload.data);
    }, [initialPage]);

    const { items: posts, hasNextPage, isLoading, error, retry } = useInfinitePagination<Post>({
        initialPage: toPaginationPage(initialPage),
        fetchPage,
        getItemKey: (post) => post.id,
    });

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
        <Stack sx={{ gap: 2 }}>
            <Masonry columns={{ lg: 5, md: 4, sm: 3, xl: 6, xs: 1 }}>
                {posts.map((post) => (<InstagramPost key={post.id} post={post} />))}
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
                        ? "Loading more posts..."
                        : `Showing ${hasNextPage ? "" : "all "}${posts.length} posts (${imageCount} images)`}
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
