"use client";

import { InstagramPost } from "components/pages/gallery/instagramPost";
import { Masonry } from "@mui/lab";
import type { Post } from "api/instagram/route";
import type { ReactElement } from "react";
import { useFetch } from "hooks/useFetch";

/**
 * This page shows my Instagram posts.
 * @returns My Instagram posts.
 */
export default function Gallery(): ReactElement {
    // Calls the backend API to access the posts from Instagram.
    const posts = useFetch<Post[]>("/api/instagram");

    // Renders the gallery page.
    return (
        <Masonry columns={{ lg: 6, sm: 3, xs: 1 }}>
            {(posts ?? []).map((post, i) => <InstagramPost key={i} post={post} />)}
        </Masonry>
    );
}
