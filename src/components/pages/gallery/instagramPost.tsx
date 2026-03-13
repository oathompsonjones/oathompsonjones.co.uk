"use client";

import type { BeholdPost, Post } from "actions/instagram";
import { ChatBubble, Favorite, Instagram } from "@mui/icons-material";
import { Stack, Typography, Zoom } from "@mui/material";
import { Card } from "components/card";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

/**
 * Renders an Instagram post.
 * @param props - An object containing the component props.
 * @param props.post - The Instagram post to render.
 * @returns An element which renders an Instagram post.
 */
export function InstagramPost({ post }: { post: BeholdPost | Post; }): ReactNode {
    const isBeholdPost = (_post: BeholdPost | Post): _post is BeholdPost => "mediaType" in post;
    const isBehold = isBeholdPost(post);

    // Posts with multiple images recursively call this element.
    if ((isBehold ? post.mediaType : post.media_type) === "CAROUSEL_ALBUM") {
        if (!("children" in post))
            return null;

        return (isBehold ? post.children : post.children.data)
            .map((image, i) => <InstagramPost key={i} post={{ ...post, ...image }} />);
    }

    // The hover state is used to display the Instagram logo when the user hovers over the post.
    const [hover, setHover] = useState(false);
    const handleHover = (): void => setHover((prev) => !prev);

    // Reserve a 1:1 space before the image loads so Masonry can compute column heights correctly.
    const [loaded, setLoaded] = useState(false);
    const handleLoad = (): void => setLoaded(true);

    // All other posts are displayed as a single image.
    return (
        <Zoom in timeout={500}>
            <Card onMouseEnter={handleHover} onMouseLeave={handleHover} sx={{ position: "relative" }}>
                <Card.ActionArea
                    centerRipple sx={{
                        height: "100%",
                        position: "absolute",
                        transition: "opacity 0.25s linear",
                        width: "100%",
                    }}>
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        gap={2}
                        component={Link}
                        href={post.permalink}
                        style={{
                            color: "white",
                            height: "100%",
                            opacity: hover ? "100%" : "0%",
                            transition: "opacity 0.25s linear",
                        }}
                    >
                        <Instagram sx={{ height: "50%", width: "50%" }} />
                        <div>
                            {post.like_count !== undefined && (
                                <Stack direction="row" alignItems="center" justifyContent="center" gap={2}>
                                    <Favorite fontSize="large" />
                                    <Typography variant="h3" color="white">
                                        {post.like_count}
                                    </Typography>
                                </Stack>
                            )}
                            {post.comments_count !== undefined && (
                                <Stack direction="row" alignItems="center" justifyContent="center" gap={2}>
                                    <ChatBubble fontSize="large" />
                                    <Typography variant="h3" color="white">
                                        {post.comments_count}
                                    </Typography>
                                </Stack>
                            )}
                        </div>
                    </Stack>
                </Card.ActionArea>
                <Card.Media
                    component="img"
                    image={isBehold ? post.mediaUrl : post.media_url}
                    onLoad={handleLoad}
                    style={{
                        aspectRatio: loaded ? undefined : "1 / 1",
                        margin: "-1rem",
                        objectFit: loaded ? undefined : "cover",
                        width: "calc(100% + 2rem)",
                    }}
                />
            </Card>
        </Zoom>
    );
}
