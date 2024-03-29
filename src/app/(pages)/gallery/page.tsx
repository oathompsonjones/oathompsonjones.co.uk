"use client";
import type { IPost } from "api/instagram";
import InstagramPost from "./instagramPost";
import Link from "next/link";
import { Masonry } from "@mui/lab";
import { Typography } from "@mui/material";
import useFetch from "hooks/useFetch";

/**
 * This page shows my Instagram posts.
 *
 * @returns My Instagram posts.
 */
export default function Gallery(): React.ReactElement {
    // Calls the backend API to access the posts from Instagram.
    const posts = useFetch<IPost[]>("/api/instagram");

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
