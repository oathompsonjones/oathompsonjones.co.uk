"use server";

/* eslint-disable @typescript-eslint/naming-convention */
import { readFile, writeFile } from "fs/promises";
import type { ActionResponse } from ".";

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

type BeholdBasePost = Omit<Post, "media_url"> & {
    mediaUrl: string;
};

type BeholdCarouselPost = BeholdBasePost & {
    children: Array<{
        mediaType: SINGLE_MEDIA_TYPE;
        mediaUrl: string;
    }>;
    mediaType: MEDIA_TYPE;
};

type BeholdSinglePost = BeholdBasePost & {
    mediaType: SINGLE_MEDIA_TYPE;
};

export type BeholdPost = BeholdCarouselPost | BeholdSinglePost;

/**
 * Fetches the latest Instagram posts.
 * @returns The latest Instagram posts.
 */
async function refreshToken(): Promise<void> {
    if (Date.now() >= parseInt(process.env.INSTAGRAM_ACCESS_TOKEN_REFRESH_AT, 10)) {
        try {
            const response = await fetch(`https://graph.instagram.com/v22.0/refresh_access_token?${[
                "grant_type=ig_refresh_token",
                `access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`,
            ].join("&")}`);

            if (!response.ok)
                throw new Error("Failed to refresh the access token.");

            const { access_token: accessToken } = await response.json() as TokenRes;
            const refreshAt = Date.now() + 24 * 60 * 60 * 1000;

            /* eslint-disable require-atomic-updates */
            process.env.INSTAGRAM_ACCESS_TOKEN = accessToken;
            // eslint-disable-next-line id-length
            process.env.INSTAGRAM_ACCESS_TOKEN_REFRESH_AT = String(refreshAt);
            /* eslint-enable require-atomic-updates */

            let fileData = await readFile("./.env", "utf8");

            fileData = fileData.replace(
                /INSTAGRAM_ACCESS_TOKEN=.*\n/,
                `INSTAGRAM_ACCESS_TOKEN=${accessToken}\n`,
            );
            fileData = fileData.replace(
                /INSTAGRAM_ACCESS_TOKEN_REFRESH_AT=.*\n/,
                `INSTAGRAM_ACCESS_TOKEN_REFRESH_AT=${refreshAt}\n`,
            );

            await writeFile("./.env", fileData);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err instanceof Error ? `${err.name}: ${err.message}\n${err.stack ?? ""}` : String(err));
        }
    }
}

/**
 * Gets all of my Instagram posts.
 * @returns An array of my Instagram posts.
 */
export async function getInstagramPosts(): Promise<ActionResponse<Post[]>> {
    // Refresh the access token if necessary.
    await refreshToken();

    let data: Post[] = [];

    try {
        const response = await fetch(`https://graph.instagram.com/me/media?fields=${[
            "caption",
            "id",
            "media_type",
            "media_url",
            "permalink",
            "timestamp",
            "username",
            "children{media_type, media_url}",
        ].join(",")}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`);

        if (!response.ok)
            throw new Error("Failed to fetch the Instagram posts.");

        ({ data } = await response.json() as DataRes);
    } catch (error) {
        return {
            error: error instanceof Error ? error : new Error("Internal server error"),
            success: false,
        };
    }

    data = data.filter((post) => !post.permalink.startsWith("https://www.instagram.com/reel/"));
    const head = data.find((post) => post.caption?.includes("#pin"));
    const tail = data.filter((post) => post.id !== head?.id);

    return {
        data: head ? [head, ...tail] : tail,
        success: true,
    };
}

/**
 * Uses the Behold API to get the latest Instagram posts.
 * Temporary solution until I can get the Instagram API to work.
 * Only the latest six posts are fetched, as I'm not paying for a temporary fix.
 * @returns The latest Instagram posts.
 */
export async function behold(): Promise<ActionResponse<BeholdPost[]>> {
    const url = "https://feeds.behold.so/waaIKjdqb9WsriY3BCih";

    try {
        const response = await fetch(url);
        const data = await response.json() as { posts: BeholdPost[]; };

        return { data: data.posts, success: true };
    } catch (error) {
        return {
            error: error instanceof Error ? error : new Error(String(error)),
            success: false,
        };
    }
}
