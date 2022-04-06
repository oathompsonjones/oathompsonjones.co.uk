import { Card, Carousel } from "react-bootstrap";
import React, { Component } from "react";
import { Instagram } from "../../../Typings";

export default class InstagramPost extends Component<{ post: Instagram.IPost; }> {
    public constructor(public readonly props: { post: Instagram.IPost; }) {
        super(props);
    }

    public render(): JSX.Element {
        const { post } = this.props;
        switch (post.media_type) {
            case "CAROUSEL_ALBUM":
                return <Card bg="dark">
                    <Carousel>
                        {post.children.data.map((image) =>
                            <Carousel.Item>
                                <Card.Img src={image.media_url} />
                            </Carousel.Item>
                        )}
                    </Carousel>
                    <Card.Footer className="text-muted">
                        <a href={post.permalink}>View on Instagram</a>
                    </Card.Footer>
                </Card>;
            case "IMAGE":
            default:
                return <Card bg="dark">
                    <Card.Img src={post.media_url} />
                    <Card.Footer className="text-muted">
                        <a href={post.permalink}>View on Instagram</a>
                    </Card.Footer>
                </Card>;
        }
    }
}