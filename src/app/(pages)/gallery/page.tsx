"use client";
import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import type { IPost } from "@/app/api/instagram";
import { InstagramPost } from "./components/instagramPost";
import Link from "next/link";
import { Masonry } from "@mui/lab";
import { useAxios } from "@/hooks/useAxios";

/**
 * This page shows my Instagram posts.
 *
 * @returns {JSX.Element} My Instagram posts.
 */
export default function Gallery(): JSX.Element {
    const [posts] = useAxios<IPost[]>("/api/instagram");
    // Calls the backend API to access the posts from Instagram.

    // Renders the gallery page.
    return (
        <Container>
            <Typography variant="h2">Gallery</Typography>
            <Typography variant="subtitle1">
                These images are pulled directly from my <Link href="/instagram">Instagram</Link> profile.
            </Typography>
            {
                posts === null ? (
                    <Stack alignItems="center" justifyContent="center">
                        <CircularProgress />
                    </Stack>
                ) : (
                    <Masonry columns={{ lg: 4, md: 3, sm: 2, xs: 1 }}>
                        {posts.map((post, i) => <InstagramPost index={i} key={i} post={post} />)}
                    </Masonry>
                )
            }
        </Container>
    );
}
