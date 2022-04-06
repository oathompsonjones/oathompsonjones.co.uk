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

type IPost = ICarouselPost | ISinglePost;

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