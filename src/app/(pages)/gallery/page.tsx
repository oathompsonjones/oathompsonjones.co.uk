import { InstagramArchive } from "components/pages/gallery/instagramArchive";
import type { ReactNode } from "react";

/**
 * This page shows my Instagram posts, which are fetched in the background.
 * @returns My Instagram posts.
 */
export default function Gallery(): ReactNode {
    return <InstagramArchive />;
}
