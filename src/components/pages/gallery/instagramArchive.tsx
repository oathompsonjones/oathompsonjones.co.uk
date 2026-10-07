"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import type { InfinitePaginationPage } from "hooks/useInfinitePagination";
import type { InstagramPage } from "actions/instagram";
import { InstagramPost } from "components/pages/gallery/instagramPost";
import type { ReactNode } from "react";
import { SkeletonMasonry } from "components/skeletonMasonry";
import { useCallback } from "react";
import { useInfinitePagination } from "hooks/useInfinitePagination";

const SKELETON_COUNT = 8;
const COLUMNS = { lg: 5, md: 4, sm: 3, xl: 6, xs: 1 };

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
 * @param page - The Instagram page.
 * @returns A generic pagination page.
 */
function toPaginationPage(
    page: InstagramPage,
): InfinitePaginationPage<InstagramPage["posts"][number]> {
    return {
        endCursor: page.pageInfo.endCursor,
        hasNextPage: page.pageInfo.hasNextPage,
        items: page.posts,
    };
}

/**
 * Renders a gallery archive with infinite scrolling.
 * @returns A client-side archive with incremental loading.
 */
export function InstagramArchive(): ReactNode {
    type Post = InstagramPage["posts"][number];

    // Fetches the next page of Instagram posts.
    const fetchPage = useCallback(async ({ cursor }: {
        cursor: string | null;
    }): Promise<InfinitePaginationPage<Post>> => {
        const params = new URLSearchParams();

        if (cursor !== null)
            params.set("after", cursor);

        const response = await fetch(`/api/instagram/posts?${params.toString()}`);
        const payload = await response.json() as InstagramPageResponse;

        if (!response.ok || !payload.success)
            throw new Error(payload.success ? "Failed to load posts." : payload.error);

        return toPaginationPage(payload.data);
    }, []);

    const { items: posts, hasNextPage, isLoading, error, retry } = useInfinitePagination<Post>({
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
            <SkeletonMasonry
                columns={COLUMNS}
                count={SKELETON_COUNT}
                fallbackCount={12}
                loading={isLoading}
                maxRatio={1.4}
                minRatio={0.8}
            >
                {posts.map((post) => (<InstagramPost key={post.id} post={post} />))}
            </SkeletonMasonry>

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
                        ? `Loading ${posts.length === 0 ? "" : "more "}posts...`
                        : `Showing ${hasNextPage ? "" : "all "}${posts.length} posts (${imageCount} images)`}
                </Typography>
            </Box>

            {error !== null && (
                <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ alignItems: "center", justifyContent: "center" }}
                >
                    <Typography color="error" variant="caption">{error}</Typography>
                    <Button onClick={retry} size="small" variant="text">Retry</Button>
                </Stack>
            )}
        </Stack>
    );
}
