/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import Config from "config";
import Logger from "../../../logger";

export interface IBasePost {
    caption?: string;
    id: string;
    media_url: string;
    permalink: string;
    timestamp: string;
    username: "oathompsonjones";
}

export interface ICarouselPost extends IBasePost {
    children: {
        data: Array<{
            media_type: SINGLE_MEDIA_TYPE;
            media_url: string;
        }>;
    };
    media_type: MEDIA_TYPE;
}

export interface ISinglePost extends IBasePost {
    media_type: SINGLE_MEDIA_TYPE;
}

export type IPost = ICarouselPost | ISinglePost;
export type SINGLE_MEDIA_TYPE = "IMAGE" | "VIDEO";
export type MEDIA_TYPE = SINGLE_MEDIA_TYPE | "CAROUSEL_ALBUM";

interface Res {
    access_token: string; 
    expires_in: number; 
    token_type: "bearer";
}

export async function refreshToken(): Promise<void> {
    try {
        if (Date.now() >= Config.instagram.accessTokenRefreshAt) {
            const { access_token, expires_in } = await fetch(`https://graph.instagram.com/refresh_access_token?${[
                "grant_type=ig_refresh_token",
                `access_token=${Config.instagram.accessToken}`
            ].join("&")}`).then(async (res) => await res.json() as Res);
            Config.update({
                instagram: {
                    ...Config.instagram,
                    accessToken: access_token,
                    accessTokenRefreshAt: Math.floor(Date.now() + 9 / 10 * expires_in)
                }
            });
            await Logger.info("Instagram token refreshed");
        }
    } catch (err) {
        await Logger.error(err instanceof Error ? `${err.name}: ${err.message}\n${err.stack ?? ""}` : String(err));
    }
}
