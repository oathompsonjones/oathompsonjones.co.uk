import { CardColumns, Col, Container, Row, Spinner } from "react-bootstrap";
import React, { Component } from "react";
import axios, { AxiosResponse } from "axios";
import { Instagram } from "../../../Typings";
import InstagramPost from "../Components/InstagramPost";

export default class Gallery extends Component<{}, { posts: Instagram.IPost[]; }> {
    public constructor() {
        super({});
        this.state = { posts: [] };
    }

    public async componentDidMount(): Promise<void> {
        try {
            const res: AxiosResponse<Instagram.IPost[]> = await axios.get("/api/instagram");
            this.setState({ posts: res.data });
        } catch (err) {
            console.error(err);
        }
    }

    public render(): JSX.Element {
        document.title = "Oliver Jones | Gallery";
        return this.state.posts.length === 0
            ? <Container style={{ textAlign: "center" }}>
                <Row>
                    <Col>
                        <Spinner animation="border" variant="primary" />
                    </Col>
                </Row>
            </Container>
            : <Container>
                <CardColumns>
                    {this.state.posts.map((post) => <InstagramPost post={post} />)}
                </CardColumns>
            </Container>;
    }
}
