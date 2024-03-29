/* eslint-disable require-atomic-updates, @typescript-eslint/naming-convention */
import Config from "../../../../config.json";
import Logger from "logger";
import { writeFile } from "fs/promises";

export type BasePost = {
    caption?: string;
    id: string;
    media_url: string;
    permalink: string;
    timestamp: string;
    username: "oathompsonjones";
};

export type CarouselPost = BasePost & {
    children: {
        data: Array<{
            media_type: SINGLE_MEDIA_TYPE;
            media_url: string;
        }>;
    };
    media_type: MEDIA_TYPE;
};

export type SinglePost = BasePost & {
    media_type: SINGLE_MEDIA_TYPE;
};

export type Post = CarouselPost | SinglePost;
export type SINGLE_MEDIA_TYPE = "IMAGE" | "VIDEO";
export type MEDIA_TYPE = SINGLE_MEDIA_TYPE | "CAROUSEL_ALBUM";

type Res = {
    access_token: string;
    expires_in: number;
    token_type: "bearer";
};

/**
 * Fetches the latest Instagram posts.
 * @returns The latest Instagram posts.
 */
export async function refreshToken(): Promise<void> {
    try {
        if (Date.now() >= Config.instagram.accessTokenRefreshAt) {
            const { access_token, expires_in } = await fetch(`https://graph.instagram.com/refresh_access_token?${[
                "grant_type=ig_refresh_token",
                `access_token=${Config.instagram.accessToken}`,
            ].join("&")}`).then(async (res) => await res.json() as Res);

            Config.instagram.accessToken = access_token;
            Config.instagram.accessTokenRefreshAt = Math.floor(Date.now() + 9 / 10 * expires_in);
            await writeFile("./config.json", JSON.stringify(Config, null, 4));

            await Logger.info("Instagram token refreshed");
        }
    } catch (err) {
        await Logger.error(err instanceof Error ? `${err.name}: ${err.message}\n${err.stack ?? ""}` : String(err));
    }
}
