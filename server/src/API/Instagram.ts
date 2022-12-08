import type { Request, Response } from "express";
import type { AxiosResponse } from "axios";
import Config from "../Config";
import type { IPost } from "../../../typings";
import axios from "axios";

export async function requestHandler(_req: Request, res: Response): Promise<void> {
    try {
        const response: AxiosResponse<{
            data: IPost[];
            paging: {
                cursors: {
                    after: string;
                    before: string;
                };
            };
        }> = await axios.get(`https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username,children{media_type,media_url}&access_token=${Config.instagram.accessToken}`);
        res.send(response.data.data);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function refreshToken(): Promise<void> {
    try {
        if (Date.now() > Config.instagram.accessTokenRefreshAt) {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const response: AxiosResponse<{ access_token: string; expires_in: number; token_type: "bearer"; }> =
                await axios.get(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${Config.instagram.accessToken}`);
            const { access_token: accessToken, expires_in: expiresIn } = response.data;
            Config.update({
                instagram: {
                    ...Config.instagram,
                    accessToken,
                    accessTokenRefreshAt: Math.floor(Date.now() + 9 * expiresIn / 10)
                }
            });
        }
    } catch (err) {
        console.error(err);
    }
}
