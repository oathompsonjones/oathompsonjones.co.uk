import type { AxiosResponse } from "axios";
import Config from "config";
import { CronJob } from "cron";
import { LogLevel } from "api/logs";
import axios from "axios";

/* eslint-disable @typescript-eslint/naming-convention */
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

export async function refreshToken(): Promise<void> {
    try {
        if (Date.now() >= Config.instagram.accessTokenRefreshAt) {
            const response: AxiosResponse<{
                // eslint-disable-next-line @typescript-eslint/naming-convention
                access_token: string; expires_in: number; token_type: "bearer";
            }> = await axios.get(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${
                Config.instagram.accessToken}`);
            const { access_token: accessToken, expires_in: expiresIn } = response.data;
            Config.update({
                instagram: {
                    ...Config.instagram,
                    accessToken,
                    accessTokenRefreshAt: Math.floor(Date.now() + 9 / 10 * expiresIn)
                }
            });
            await axios.post("/api/logs", {
                content: "Instagram token refreshed",
                level: LogLevel.INFO
            });
        }
    } catch (err) {
        await axios.post("/api/logs", {
            content: err instanceof Error ? `${err.name}: ${err.message}\n${err.stack ?? ""}` : err,
            level: LogLevel.ERROR
        });
    }
}

void new CronJob("* * * * *", refreshToken, null, true, "utc");