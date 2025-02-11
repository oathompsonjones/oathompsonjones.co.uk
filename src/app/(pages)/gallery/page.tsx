/* Import { InstagramPost } from "components/pages/gallery/instagramPost";
import { Masonry } from "@mui/lab";
import { getInstagramPosts } from "actions/instagram"; */
import type { ReactNode } from "react";
import { Typography } from "@mui/material";

export const dynamic = "force-dynamic";

/**
 * This page shows my Instagram posts.
 * @returns My Instagram posts.
 */
export default function Gallery(): ReactNode {
    return (
        <div style={{ margin: "auto", textAlign: "center" }}>
            <Typography variant="h5" color="secondary">
                Instagram has disabled the API which this page depended on.
            </Typography>
            <Typography variant="h6">
                This page will be updated to use the new API soon.
            </Typography>
        </div>
    );

    /*
    // Calls the backend API to access the posts from Instagram.
    const response = await getInstagramPosts();

    if (!response.success)
        throw response.error;

    // Renders the gallery page.
    return (
        <Masonry columns={{ lg: 6, sm: 3, xs: 1 }}>
            {response.data.map((post, i) => <InstagramPost key={i} post={post} />)}
        </Masonry>
    ); */
}
