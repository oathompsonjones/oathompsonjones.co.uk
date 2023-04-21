import { ArrowLeft, ArrowRight, Instagram, Minimize } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Link, Stack, Zoom } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import type { IPost } from "@/app/api/instagram";

/**
 * Renders an Instagram post.
 *
 * @param {{ index: number; post: IPost; }} props An object containing the component props.
 * @param {number} props.index The index of the repository, required to allow proper rendering by React.
 * @param {IPost} props.post The post object.
 * @returns {JSX.Element} An element which renders an Instagram post.
 */
export function InstagramPost({ index, post }: { index: number; post: IPost; }): JSX.Element {
    let media: JSX.Element;
    // Checks the media type.
    switch (post.media_type) {
        case "CAROUSEL_ALBUM":
            media = (
                <Carousel IndicatorIcon={<Minimize />} NextIcon={<ArrowRight />} PrevIcon={<ArrowLeft />}>
                    {post.children.data.map((image, i) => <CardMedia component="img" image={image.media_url} key={i} />)}
                </Carousel>
            );
            break;
        // Renders an image or video.
        case "IMAGE":
        default:
            media = <CardMedia component="img" image={post.media_url} />;
            break;
    }
    // Returns a Zoom element wrapping the post to make it look nicer when loading in.
    return (
        <Zoom in style={{ transitionDelay: `${index * 100}ms` }}>
            {/* This Card element contains the post. */}
            <Card>
                {/* Renders the post's media. */}
                {media}
                {/* Renders a link to the post on Instagram. */}
                <CardContent>
                    <Link href={post.permalink} sx={{ textDecoration: "none" }}>
                        <Stack alignItems="center" direction="row">
                            <Instagram /> View on Instagram
                        </Stack>
                    </Link>
                </CardContent>
            </Card>
        </Zoom>
    );
}
