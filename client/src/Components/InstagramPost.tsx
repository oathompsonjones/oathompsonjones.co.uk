import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Instagram } from "../../../Typings";

export default class InstagramPost extends Component<{ post: Instagram.IPost; }> {
    public constructor(public readonly props: { post: Instagram.IPost; }) {
        super(props);
    }

    public render(): JSX.Element {
        const { post } = this.props;
        return <Card bg="dark">
            <Card.Img src={post.media_url} />
            <Card.Footer className="text-muted">
                <a href={post.permalink}>View on Instagram</a>
            </Card.Footer>
        </Card>;
    }
}