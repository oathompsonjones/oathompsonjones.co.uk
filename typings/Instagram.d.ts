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
            media_type: "IMAGE" | "VIDEO";
            media_url: string;
        }>;
    };
    media_type: "CAROUSEL_ALBUM";
}

export interface ISinglePost extends IBasePost {
    media_type: "IMAGE" | "VIDEO";
}

export type IPost = ICarouselPost | ISinglePost;
