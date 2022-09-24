import { CircularProgress, Container, Stack } from "@mui/material";
import React, { Component } from "react";
import axios, { AxiosResponse } from "axios";
import { Instagram } from "../../../Typings";
import InstagramPost from "../Components/InstagramPost";
import { Masonry } from "@mui/lab";

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
        console.log(this.state.posts);
        return (
            <Container>
                {
                    this.state.posts.length === 0
                        ? <Stack justifyContent="center" alignItems="center">
                            <CircularProgress />
                        </Stack>
                        : <Masonry>
                            {this.state.posts.map((post) => <InstagramPost post={post} />)}
                        </Masonry>
                }
            </Container>
        );
    }
}
