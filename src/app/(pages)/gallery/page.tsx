import { InstagramArchive } from "components/pages/gallery/instagramArchive";
import type { ReactNode } from "react";
import { getInstagramPostsPage } from "actions/instagram";

export const dynamic = "force-dynamic";

/**
 * This page shows my Instagram posts.
 * @returns My Instagram posts.
 * @throws {Error} If the API call fails.
 */
export default async function Gallery(): Promise<ReactNode> {
    const response = await getInstagramPostsPage();

    if (!response.success) {
        throw response.error instanceof Error
            ? response.error
            : new Error("Failed to fetch Instagram posts");
    }

    return <InstagramArchive initialPage={response.data} />;
}
