import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ArrowRight from "@mui/icons-material/ArrowRight";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Carousel from "@/components/carousel";
import type { IPost } from "@/app/api/instagram";
import Instagram from "@mui/icons-material/Instagram";
import Link from "next/link";
import Minimize from "@mui/icons-material/Minimize";
import Stack from "@mui/material/Stack";
import Zoom from "@mui/material/Zoom";

/**
 * Renders an Instagram post.
 *
 * @param {{ index: number; post: IPost; }} props An object containing the component props.
 * @param {number} props.index The index of the repository, required to allow proper rendering by React.
 * @param {IPost} props.post The post object.
 * @returns {JSX.Element} An element which renders an Instagram post.
 */
export default function InstagramPost({ index, post }: { index: number; post: IPost; }): JSX.Element {
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
                    <Link href={post.permalink} style={{ textDecoration: "none" }}>
                        <Stack alignItems="center" direction="row">
                            <Instagram /> View on Instagram
                        </Stack>
                    </Link>
                </CardContent>
            </Card>
        </Zoom>
    );
}
