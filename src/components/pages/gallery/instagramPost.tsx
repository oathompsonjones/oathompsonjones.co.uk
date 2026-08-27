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
                        component={Link}
                        href={post.permalink}
                        sx={{
                            alignItems: "center",
                            color: "white",
                            gap: 1.5,
                            height: "100%",
                            justifyContent: "center",
                            opacity: hover ? "100%" : "0%",
                            transition: "opacity 0.25s linear",
                            textDecoration: "none",
                            // Ensure overlay content scales to fit small images
                            boxSizing: "border-box",
                            padding: 1,
                        }}
                    >
                        <Instagram sx={{ fontSize: "clamp(28px, 6vw, 64px)" }} />
                        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", justifyContent: "center", maxHeight: "80%", overflow: "visible", padding: "0.25rem 0" }}>
                            {post.like_count !== undefined && (
                                <Stack direction="row" sx={{ alignItems: "center", gap: 1.25, justifyContent: "center", lineHeight: 1 }}>
                                    <Favorite sx={{ fontSize: "clamp(16px, 3.5vw, 28px)", lineHeight: 1 }} />
                                    <Typography sx={{ fontSize: "clamp(14px, 4vw, 24px)", lineHeight: 1, m: 0 }} color="white">
                                        {post.like_count}
                                    </Typography>
                                </Stack>
                            )}
                            {post.comments_count !== undefined && (
                                <Stack direction="row" sx={{ alignItems: "center", gap: 1.25, justifyContent: "center", lineHeight: 1 }}>
                                    <ChatBubble sx={{ fontSize: "clamp(16px, 3.5vw, 28px)", lineHeight: 1 }} />
                                    <Typography sx={{ fontSize: "clamp(14px, 4vw, 24px)", lineHeight: 1, m: 0 }} color="white">
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
