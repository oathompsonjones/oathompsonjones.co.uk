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
