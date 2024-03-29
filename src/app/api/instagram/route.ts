import Config from "../../../../config.json";
import { NextResponse } from "next/server";
import type { Post } from ".";
import { refreshToken } from ".";

/**
 * Gets the Instagram posts.
 * @returns The Instagram posts.
 */
export async function GET(): Promise<NextResponse> {
    await refreshToken();
    const response = await fetch(`https://graph.instagram.com/me/media?fields=${[
        "caption",
        "id",
        "media_type",
        "media_url",
        "permalink",
        "timestamp",
        "username",
        "children{media_type, media_url}",
    ].join(",")}&access_token=${Config.instagram.accessToken}`).then(async (res) => res.json()) as {
        data: Post[];
        paging: {
            cursors: {
                after: string;
                before: string;
            };
        };
    };
    const data = response.data.filter((post) => !post.permalink.startsWith("https://www.instagram.com/reel/"));
    const head = data.find((post) => post.caption?.includes("#pin"));
    const tail = data.filter((post) => post.id !== head?.id);

    return NextResponse.json([head, ...tail]);
}
