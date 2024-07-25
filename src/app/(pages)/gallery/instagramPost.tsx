import { Instagram } from "@mui/icons-material";
import type { Post } from "api/instagram";
import { useState, type ReactElement } from "react";
import { Card, CardMedia, Zoom } from "@mui/material";
import Link from "next/link";

/**
 * Renders an Instagram post.
 * @param props - An object containing the component props.
 * @returns An element which renders an Instagram post.
 */
export default function InstagramPost({ post }: { readonly post: Post; }): ReactElement {
    // Posts with multiple images recursively call this element.
    if (post.media_type === "CAROUSEL_ALBUM") {
        return (
            <>
                {post.children.data.map((image, i) => <InstagramPost key={i} post={{ ...post, ...image }} />)}
            </>
        );
    }

    // The hover state is used to display the Instagram logo when the user hovers over the post.
    const [hover, setHover] = useState(false);
    const handleHover = (): void => setHover((prev) => !prev);

    const instagramLogo = (
        <Instagram
            sx={{
                color: "white",
                cursor: "pointer",
                height: "50%",
                left: "50%",
                position: "absolute",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "50%",
            }}
        />
    );

    // A glow effect is displayed behind each post.
    const glowEffect = (
        <CardMedia
            component="img"
            image={post.media_url}
            sx={{
                filter: "blur(5px)",
                height: "calc(100% + 0.25rem)",
                margin: "-0.125rem",
                position: "absolute",
                width: "calc(100% + 0.25rem)",
                zIndex: -1,
            }}
        />
    );

    // All other posts are displayed as a single image.
    return (
        <Zoom in timeout={500}>
            <Card onMouseEnter={handleHover} onMouseLeave={handleHover} square
                sx={{
                    border: "none",
                    boxShadow: "none",
                    overflow: "visible",
                    position: "relative",
                }}
            >
                <Link
                    href={post.permalink}
                    style={{
                        background: "rgba(0, 0, 0, 0.25)",
                        display: hover ? "block" : "none",
                        height: "100%",
                        position: "absolute",
                        width: "100%",
                    }}
                >
                    {instagramLogo}
                </Link>
                {glowEffect}
                <CardMedia component="img" image={post.media_url} sx={{ height: "100%", width: "100%" }} />
            </Card>
        </Zoom>
    );
}
