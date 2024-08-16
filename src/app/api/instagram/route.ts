/* eslint-disable @typescript-eslint/naming-convention */
import Config from "../../../../config.json";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";

type BasePost = {
    caption?: string;
    id: string;
    media_url: string;
    permalink: string;
    timestamp: string;
    username: "oathompsonjones";
};

type CarouselPost = BasePost & {
    children: {
        data: Array<{
            media_type: SINGLE_MEDIA_TYPE;
            media_url: string;
        }>;
    };
    media_type: MEDIA_TYPE;
};

type SinglePost = BasePost & {
    media_type: SINGLE_MEDIA_TYPE;
};

export type Post = CarouselPost | SinglePost;

type SINGLE_MEDIA_TYPE = "IMAGE" | "VIDEO";

type MEDIA_TYPE = SINGLE_MEDIA_TYPE | "CAROUSEL_ALBUM";

type TokenRes = {
    access_token: string;
    expires_in: number;
    token_type: "bearer";
};

type DataRes = {
    data: Post[];
    paging: {
        cursors: {
            after: string;
            before: string;
        };
    };
};

/**
 * Fetches the latest Instagram posts.
 * @returns The latest Instagram posts.
 */
async function refreshToken(): Promise<void> {
    try {
        if (Date.now() >= Config.instagram.accessTokenRefreshAt) {
            const { access_token: accessToken } = await fetch(`https://graph.instagram.com/refresh_access_token?${[
                "grant_type=ig_refresh_token",
                `access_token=${Config.instagram.accessToken}`,
            ].join("&")}`).then(async (res) => await res.json() as TokenRes);

            Config.instagram = {
                ...Config.instagram,
                accessToken,
                accessTokenRefreshAt: Date.now() + 24 * 60 * 60 * 1000,
            };
            await writeFile("./config.json", JSON.stringify(Config, null, 4));
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err instanceof Error ? `${err.name}: ${err.message}\n${err.stack ?? ""}` : String(err));
    }
}

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
    ].join(",")}&access_token=${Config.instagram.accessToken}`).then(async (res) => res.json()) as DataRes;
    const data = response.data.filter((post) => !post.permalink.startsWith("https://www.instagram.com/reel/"));
    const head = data.find((post) => post.caption?.includes("#pin"));
    const tail = data.filter((post) => post.id !== head?.id);

    return NextResponse.json([head, ...tail]);
}
