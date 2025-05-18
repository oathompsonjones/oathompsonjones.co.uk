"use client";

import type { BeholdPost, Post } from "actions/instagram";
import { Card, CardMedia, Zoom } from "@mui/material";
import { Instagram } from "@mui/icons-material";
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

    // All other posts are displayed as a single image.
    return (
        <Zoom in timeout={500}>
            <Card onMouseEnter={handleHover} onMouseLeave={handleHover} sx={{ position: "relative" }}>
                <Link
                    href={post.permalink}
                    style={{
                        background: "rgba(0, 0, 0, 0.25)",
                        height: "100%",
                        opacity: hover ? "100%" : "0%",
                        position: "absolute",
                        transition: "opacity 0.25s linear",
                        width: "100%",
                    }}
                >
                    <Instagram
                        sx={{
                            color: "white",
                            height: "50%",
                            left: "50%",
                            position: "absolute",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "50%",
                        }}
                    />
                </Link>
                <CardMedia component="img" image={isBehold ? post.mediaUrl : post.media_url} />
            </Card>
        </Zoom>
    );
}
