import type { AxiosResponse } from "axios";
import Config from "config";
import type { IPost } from "./";
import { NextResponse } from "next/server";
import axios from "axios";
import { job } from "cron";

async function refreshToken(): Promise<void> {
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
        }
    } catch (err) {
        console.error(err);
    }
}

job("* * * * *", refreshToken as () => void, null, true, "utc");

export async function GET(): Promise<NextResponse> {
    await refreshToken();
    const response: AxiosResponse<{
        data: IPost[];
        paging: {
            cursors: {
                after: string;
                before: string;
            };
        };
    }> = await axios.get(`https://graph.instagram.com/me/media?fields=${[
        "caption",
        "id",
        "media_type",
        "media_url",
        "permalink",
        "timestamp",
        "username",
        "children{media_type, media_url}"
    ].join(",")}&access_token=${Config.instagram.accessToken}`);
    const data = response.data.data.filter((post) => !post.permalink.startsWith("https://www.instagram.com/reel/"));
    const head = data.find((post) => post.caption?.includes("#pin"));
    const tail = data.filter((post) => post.id !== head?.id);
    return NextResponse.json([head, ...tail]);
}
