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

/**
 * Fetches the latest Instagram posts.
 * @returns The latest Instagram posts.
 */
async function refreshToken(): Promise<void> {
    if (Date.now() >= parseInt(process.env.INSTAGRAM_ACCESS_TOKEN_REFRESH_AT, 10)) {
        try {
            const response = await fetch(`https://graph.instagram.com/refresh_access_token?${[
                "grant_type=ig_refresh_token",
                `access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`,
            ].join("&")}`);

            if (response.ok) {
                const { access_token: accessToken } = await response.json() as TokenRes;
                let fileData = await readFile("./.env", "utf8");

                fileData = fileData.replace(
                    /INSTAGRAM_ACCESS_TOKEN=.*\n/,
                    `INSTAGRAM_ACCESS_TOKEN=${accessToken}\n`,
                );
                fileData = fileData.replace(
                    /INSTAGRAM_ACCESS_TOKEN_REFRESH_AT=.*\n/,
                    `INSTAGRAM_ACCESS_TOKEN_REFRESH_AT=${Date.now() + 24 * 60 * 60 * 1000}\n`,
                );

                await writeFile("./.env", fileData);
            }
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
    try {
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
        ].join(",")}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`);

        if (!response.ok)
            throw new Error();

        let { data } = await response.json() as DataRes;

        data = data.filter((post) => !post.permalink.startsWith("https://www.instagram.com/reel/"));
        const head = data.find((post) => post.caption?.includes("#pin"));
        const tail = data.filter((post) => post.id !== head?.id);

        return { data: head ? [head, ...tail] : tail, success: true };
    } catch (error) {
        return { error: "Internal Server Error", success: false };
    }
}
