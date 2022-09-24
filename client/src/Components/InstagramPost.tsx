import { ArrowLeft, ArrowRight, Minimize } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { Component } from "react";
import Carousel from "react-material-ui-carousel";
import { Instagram } from "../../../Typings";

export default class InstagramPost extends Component<{ post: Instagram.IPost; }> {
    public constructor(public readonly props: { post: Instagram.IPost; }) {
        super(props);
    }

    public render(): JSX.Element {
        const { post } = this.props;
        switch (post.media_type) {
            case "CAROUSEL_ALBUM":
                return (
                    <Card>
                        <Carousel NextIcon={<ArrowRight />} PrevIcon={<ArrowLeft />} IndicatorIcon={<Minimize />}>
                            {post.children.data.map((image) => <CardMedia component="img" image={image.media_url} />)}
                        </Carousel>
                        <CardContent>
                            <Typography component="a" variant="caption" href={post.permalink}>View on Instagram</Typography>
                        </CardContent>
                    </Card>
                );
            case "IMAGE":
            default:
                return (
                    <Card>
                        <CardMedia component="img" image={post.media_url} />
                        <CardContent>
                            <Typography component="a" variant="caption" href={post.permalink}>View on Instagram</Typography>
                        </CardContent>
                    </Card>
                );
        }
    }
}