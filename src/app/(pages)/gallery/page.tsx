"use client";
import type { IPost } from "@/app/api/instagram";
import InstagramPost from "./instagramPost";
import Link from "next/link";
import Masonry from "@mui/lab/Masonry";
import Typography from "@mui/material/Typography";
import useAxios from "@/hooks/useAxios";

/**
 * This page shows my Instagram posts.
 *
 * @returns {JSX.Element} My Instagram posts.
 */
export default function Gallery(): JSX.Element {
    // Calls the backend API to access the posts from Instagram.
    const [posts] = useAxios<IPost[]>("/api/instagram");

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
