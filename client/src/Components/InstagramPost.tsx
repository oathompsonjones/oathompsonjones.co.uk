import { ArrowLeft, ArrowRight, Minimize } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Typography, Zoom } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import type { Instagram } from "../../../API";

/**
 * Renders an Instagram post.
 *
 * @param {{ index: number; post: Instagram.IPost; }} props An object containing the component props.
 * @param {number} props.index The index of the repository, required to allow proper rendering by React.
 * @param {Instagram.IPost} props.post The post object.
 * @returns {JSX.Element} An element which renders an Instagram post.
 */
export const InstagramPost = ({ index, post }: { index: number; post: Instagram.IPost; }): JSX.Element => {
    // Checks the media type.
    switch (post.media_type) {
        // Renders a carousel of images.
        case "CAROUSEL_ALBUM":
            // Returns a Zoom element wrapping the post to make it look nicer when loading in.
            return <Zoom in style={{ transitionDelay: `${index * 100}ms` }}>
                {/* This Card element contains the post. */}
                <Card>
                    {/* Renders the carousel. */}
                    <Carousel NextIcon={<ArrowRight />} PrevIcon={<ArrowLeft />} IndicatorIcon={<Minimize />}>
                        {post.children.data.map((image) => <CardMedia component="img" image={image.media_url} />)}
                    </Carousel>
                    {/* Renders a link to the post on Instagram. */}
                    <CardContent>
                        <Typography component="a" variant="caption" href={post.permalink}>View on Instagram</Typography>
                    </CardContent>
                </Card>
            </Zoom>;
        // Renders an image or video.
        case "IMAGE":
        default:
            // Returns a Zoom element wrapping the post to make it look nicer when loading in.
            return <Zoom in style={{ transitionDelay: `${index * 100}ms` }}>
                {/* This Card element contains the post. */}
                <Card>
                    {/* Renders the image. */}
                    <CardMedia component="img" image={post.media_url} />
                    {/* Renders a link to the post on Instagram. */}
                    <CardContent>
                        <Typography component="a" variant="caption" href={post.permalink}>View on Instagram</Typography>
                    </CardContent>
                </Card>
            </Zoom>;
    }
};
