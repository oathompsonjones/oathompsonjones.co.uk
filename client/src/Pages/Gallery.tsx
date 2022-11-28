import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Instagram } from "../../../API";
import { InstagramPost } from "../Components";
import { Masonry } from "@mui/lab";

/**
 * This page shows my Instagram posts.
 *
 * @returns {JSX.Element} My Instagram posts.
 */
export const Gallery = (): JSX.Element => {
    // Creates a state variable which contains the Instagram posts.
    const [posts, setPosts] = useState<Instagram.IPost[]>([]);

    // Requests the posts from the API once the page has mounted.
    useEffect(() => {
        void (async (): Promise<void> => {
            try {
                const res: AxiosResponse<Instagram.IPost[]> = await axios.get("/api/instagram");
                setPosts(res.data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    // Renders the gallery page.
    return <Container>
        <Typography variant="h2">Gallery</Typography>
        <Typography variant="subtitle1">These images are pulled directly from my <a href="/instagram">Instagram</a> profile.</Typography>
        {
            posts.length === 0
                ? <Stack justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Stack>
                : <Masonry columns={{ lg: 4, md: 3, sm: 2, xs: 1 }}>
                    {posts.map((post, i) => <InstagramPost key={i} post={post} index={i} />)}
                </Masonry>
        }
    </Container>;
};
