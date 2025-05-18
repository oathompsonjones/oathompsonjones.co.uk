
import { InstagramPost } from "components/pages/gallery/instagramPost";
import { Masonry } from "@mui/lab";
import type { ReactNode } from "react";
import { behold } from "actions/instagram";

export const dynamic = "force-dynamic";

/**
 * This page shows my Instagram posts.
 * @returns My Instagram posts.
 * @throws {Error} If the API call fails.
 */
export default async function Gallery(): Promise<ReactNode> {
    // Calls the backend API to access the posts from Instagram.
    const response = await behold();

    if (!response.success) {
        throw response.error instanceof Error
            ? response.error
            : new Error("Failed to fetch Instagram posts");
    }

    // Renders the gallery page.
    return (
        <>
            <Masonry columns={{ lg: 6, sm: 3, xs: 1 }}>
                {response.data.map((post, i) => <InstagramPost key={i} post={post} />)}
            </Masonry>
        </>
    );
}
