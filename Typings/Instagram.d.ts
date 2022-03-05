/* eslint-disable @typescript-eslint/naming-convention */
export interface IAuthResponse {
    access_token: string;
    expires_in: number;
    token_type: "bearer";
}

export interface IMediaResponse {
    data: IPost[];
    paging: {
        cursors: {
            after: string;
            before: string;
        };
    };
}

export interface IPost {
    caption?: string;
    id: string;
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    media_url: string;
    permalink: string;
    timestamp: string;
    username: "oathompsonjones";
}