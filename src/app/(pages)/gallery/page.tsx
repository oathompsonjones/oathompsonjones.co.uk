"use client";

import InstagramPost from "./instagramPost";
import Link from "next/link";
import { Masonry } from "@mui/lab";
import type { Post } from "api/instagram";
import type { ReactElement } from "react";
import { Typography } from "@mui/material";
import useFetch from "hooks/useFetch";

/**
 * This page shows my Instagram posts.
 * @returns My Instagram posts.
 */
export default function Gallery(): ReactElement {
    // Calls the backend API to access the posts from Instagram.
    const posts = useFetch<Post[]>("/api/instagram");

    // Renders the gallery page.
    return (
        <>
            <Typography variant="subtitle1">
                These images are pulled directly from my <Link href="/instagram" prefetch={false}>Instagram</Link> profile.
            </Typography>
            <Masonry columns={{ lg: 6, sm: 3, xs: 1 }} spacing={0}>
                {(posts ?? []).map((post, i) => <InstagramPost key={i} post={post} />)}
            </Masonry>
        </>
    );
}
