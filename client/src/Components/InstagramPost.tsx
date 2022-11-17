import { ArrowLeft, ArrowRight, Minimize } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Typography, Zoom } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Instagram } from "../../../API";

export const InstagramPost = (props: { index: number; post: Instagram.IPost; }): JSX.Element => {
    const { post, index } = props;
    switch (post.media_type) {
        case "CAROUSEL_ALBUM":
            return (
                <Zoom in style={{ transitionDelay: `${index * 100}ms` }}>
                    <Card>
                        <Carousel NextIcon={<ArrowRight />} PrevIcon={<ArrowLeft />} IndicatorIcon={<Minimize />}>
                            {post.children.data.map((image) => <CardMedia component="img" image={image.media_url} />)}
                        </Carousel>
                        <CardContent>
                            <Typography component="a" variant="caption" href={post.permalink}>View on Instagram</Typography>
                        </CardContent>
                    </Card>
                </Zoom>
            );
        case "IMAGE":
        default:
            return (
                <Zoom in style={{ transitionDelay: `${index * 100}ms` }}>
                    <Card>
                        <CardMedia component="img" image={post.media_url} />
                        <CardContent>
                            <Typography component="a" variant="caption" href={post.permalink}>View on Instagram</Typography>
                        </CardContent>
                    </Card>
                </Zoom>
            );
    }
};