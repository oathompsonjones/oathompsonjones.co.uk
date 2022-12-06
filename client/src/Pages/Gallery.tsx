import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import type { Instagram } from "../../../API";
import { InstagramPost } from "../Components";
import { Masonry } from "@mui/lab";
import { useAxios } from "../Hooks";

/**
 * This page shows my Instagram posts.
 *
 * @returns {JSX.Element} My Instagram posts.
 */
export const Gallery = (): JSX.Element => {
    // Calls the backend API to access the posts from Instagram.
    const [posts] = useAxios<Instagram.IPost[]>("/api/instagram");

    // Renders the gallery page.
    return (
        <Container>
            <Typography variant="h2">Gallery</Typography>
            <Typography variant="subtitle1">These images are pulled directly from my <a href="/instagram">Instagram</a> profile.</Typography>
            {
                posts === null ? (
                    <Stack alignItems="center" justifyContent="center">
                        <CircularProgress />
                    </Stack>
                ) : (
                    <Masonry columns={{ lg: 4, md: 3, sm: 2, xs: 1 }}>
                        {posts.map((post, i) => <InstagramPost index={i} key={i} post={post} />)}
                    </Masonry>
                )
            }
        </Container>
    );
};
