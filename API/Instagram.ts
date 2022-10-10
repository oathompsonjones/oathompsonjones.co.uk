import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import Config from "../Config";

/* eslint-disable @typescript-eslint/naming-convention */
export interface IAuthResponse {
    access_token: string;
    expires_in: number;
    token_type: "bearer";
}

interface IMediaResponse {
    data: IPost[];
    paging: {
        cursors: {
            after: string;
            before: string;
        };
    };
}

export type IPost = ICarouselPost | ISinglePost;

interface IBasePost {
    caption?: string;
    id: string;
    media_url: string;
    permalink: string;
    timestamp: string;
    username: "oathompsonjones";
}

interface ICarouselPost extends IBasePost {
    children: {
        data: Array<{
            media_type: "IMAGE" | "VIDEO";
            media_url: string;
        }>;
    };
    media_type: "CAROUSEL_ALBUM";
}

interface ISinglePost extends IBasePost {
    media_type: "IMAGE" | "VIDEO";
}

export async function requestHandler(_req: Request, res: Response): Promise<void> {
    try {
        const response: AxiosResponse<IMediaResponse> = await axios.get(`https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username,children{media_type,media_url}&access_token=${Config.instagram.accessToken}`);
        res.send(response.data.data);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function refreshToken(): Promise<void> {
    try {
        if (Date.now() > Config.instagram.accessTokenRefreshAt) {
            const response: AxiosResponse<IAuthResponse> = await axios.get(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${Config.instagram.accessToken}`);
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { access_token, expires_in } = response.data;
            Config.update({
                instagram: {
                    ...Config.instagram,
                    accessToken: access_token,
                    accessTokenRefreshAt: Math.floor(Date.now() + 9 * expires_in / 10)
                }
            });
        }
    } catch (err) {
        console.error(err);
    }
}