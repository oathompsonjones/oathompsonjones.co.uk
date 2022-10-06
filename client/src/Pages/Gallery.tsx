import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { Component } from "react";
import { Instagram } from "../../../Typings";
import { InstagramPost } from "../Components";
import { Masonry } from "@mui/lab";

export class Gallery extends Component<{}, { posts: Instagram.IPost[]; }> {
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
        return (
            <Container>
                <Typography variant="h2">Gallery</Typography>
                <Typography variant="subtitle1">These images are pulled directly from my <a href="/instagram">Instagram</a> profile.</Typography>
                {
                    this.state.posts.length === 0
                        ? <Stack justifyContent="center" alignItems="center">
                            <CircularProgress />
                        </Stack>
                        : <Masonry columns={{ lg: 4, md: 3, xs: 1 }}>
                            {this.state.posts.map((post, i) => <InstagramPost key={i} post={post} index={i} />)}
                        </Masonry>
                }
            </Container>
        );
    }
}
