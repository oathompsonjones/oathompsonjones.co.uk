import * as Typings from "../../../Typings";
import { CardColumns, Col, Container, Row, Spinner } from "react-bootstrap";
import React, { Component } from "react";
import axios, { AxiosResponse } from "axios";
import InstagramPost from "../Components/InstagramPost";

export default class Instagram extends Component<{}, { posts: Typings.Instagram.IPost[]; }> {
    public constructor() {
        super({});
        this.state = { posts: [] };
    }

    public async componentDidMount(): Promise<void> {
        console.time();
        try {
            const res: AxiosResponse<Typings.Instagram.IPost[]> = await axios.get("/api/instagram");
            this.setState({ posts: res.data });
        } catch (err) {
            console.error(err);
        }
        console.timeEnd();
    }

    public render(): JSX.Element {
        document.title = "Oliver Jones | Instagram";
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
