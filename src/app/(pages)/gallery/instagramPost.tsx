import type { CSSProperties } from "react";
import type { IPost } from "@/app/api/instagram";
import ImageLinkOverlay from "@/components/imageLinkOverlay";
import Instagram from "@mui/icons-material/Instagram";
import Zoom from "@mui/material/Zoom";

/**
 * Renders an Instagram post.
 *
 * @param {{ post: IPost; }} props An object containing the component props.
 * @param {IPost} props.post The post object.
 * @returns {JSX.Element} An element which renders an Instagram post.
 */
export default function InstagramPost({ post }: { post: IPost; }): JSX.Element {
    // Posts with multiple images are displayed as a carousel.
    if (post.media_type === "CAROUSEL_ALBUM") {
        return (
            <>
                {post.children.data.map((image, i) => <InstagramPost key={i} post={{ ...post, ...image }} />)}
            </>
        );
    }
    // All other posts are displayed as a single image.
    const link: CSSProperties = {
        color: "white",
        cursor: "pointer",
        height: "50%",
        left: "50%",
        position: "absolute",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%"
    };
    const zoomEffect = (children: JSX.Element): JSX.Element => <Zoom in>{children}</Zoom>;
    return (
        <ImageLinkOverlay effect={zoomEffect} href={post.permalink} image={post.media_url}>
            <Instagram style={link} />
        </ImageLinkOverlay>
    );
}
