import type { AxiosResponse } from "axios";
import Config from "config";
import type { IPost } from ".";
import { NextResponse } from "next/server";
import axios from "axios";
import { refreshToken } from ".";

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
