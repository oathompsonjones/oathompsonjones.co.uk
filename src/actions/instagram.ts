"use server";

/* eslint-disable @typescript-eslint/naming-convention */
import { readFile, writeFile } from "fs/promises";
import type { ActionResponse } from ".";

type BasePost = {
    caption?: string;
    id: string;
    media_url: string;
    permalink: string;
    timestamp: string;
    username: "oathompsonjones";
};

type CarouselPost = BasePost & {
    children: {
        data: Array<{
            media_type: SINGLE_MEDIA_TYPE;
            media_url: string;
        }>;
    };
    media_type: MEDIA_TYPE;
};

type SinglePost = BasePost & {
    media_type: SINGLE_MEDIA_TYPE;
};

export type Post = CarouselPost | SinglePost;

type SINGLE_MEDIA_TYPE = "IMAGE" | "VIDEO";

type MEDIA_TYPE = SINGLE_MEDIA_TYPE | "CAROUSEL_ALBUM";

type TokenRes = {
    access_token: string;
    expires_in: number;
    token_type: "bearer";
};

type DataRes = {
    data: Post[];
    paging: {
        cursors: {
            after: string;
            before: string;
        };
    };
};

type BeholdBasePost = Omit<Post, "media_url"> & {
    mediaUrl: string;
};

type BeholdCarouselPost = BeholdBasePost & {
    children: Array<{
        mediaType: SINGLE_MEDIA_TYPE;
        mediaUrl: string;
    }>;
    mediaType: MEDIA_TYPE;
};

type BeholdSinglePost = BeholdBasePost & {
    mediaType: SINGLE_MEDIA_TYPE;
};

export type BeholdPost = BeholdCarouselPost | BeholdSinglePost;

/**
 * Updates an environment variable in an .env file body.
 * @param fileData - Existing .env file contents.
 * @param key - Environment variable key.
 * @param value - Environment variable value.
 * @returns Updated .env file contents.
 */
function upsertEnvVar(fileData: string, key: string, value: string): string {
    const regex = new RegExp(`^${key}=.*$`, "m");
    const line = `${key}=${value}`;

    if (regex.test(fileData))
        return fileData.replace(regex, line);

    return `${fileData.trimEnd()}\n${line}\n`;
}

/**
 * Fetches the latest Instagram posts.
 * @returns The latest Instagram posts.
 */
async function refreshToken(): Promise<void> {
    const refreshAt = Number.parseInt(process.env.INSTAGRAM_ACCESS_TOKEN_REFRESH_AT || "0", 10);

    if (!Number.isNaN(refreshAt) && Date.now() < refreshAt)
        return;

    if (!process.env.INSTAGRAM_ACCESS_TOKEN)
        return;

    try {
        const response = await fetch(`https://graph.instagram.com/refresh_access_token?${[
            "grant_type=ig_refresh_token",
            `access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`,
        ].join("&")}`);

        if (!response.ok) {
            const body = await response.text();

            throw new Error(`Failed to refresh the access token (${response.status}): ${body}`);
        }

        const { access_token: accessToken } = await response.json() as TokenRes;
        const nextRefreshAt = Date.now() + 24 * 60 * 60 * 1000;

        /* eslint-disable require-atomic-updates */
        process.env.INSTAGRAM_ACCESS_TOKEN = accessToken;
        // eslint-disable-next-line id-length
        process.env.INSTAGRAM_ACCESS_TOKEN_REFRESH_AT = String(nextRefreshAt);
        /* eslint-enable require-atomic-updates */

        try {
            let fileData = await readFile("./.env", "utf8");

            fileData = upsertEnvVar(fileData, "INSTAGRAM_ACCESS_TOKEN", accessToken);
            fileData = upsertEnvVar(fileData, "INSTAGRAM_ACCESS_TOKEN_REFRESH_AT", String(nextRefreshAt));

            await writeFile("./.env", fileData);
        } catch {
            // Ignore filesystem persistence failures in read-only environments.
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err instanceof Error ? `${err.name}: ${err.message}\n${err.stack ?? ""}` : String(err));
    }
}

/**
 * Gets all of my Instagram posts.
 * @returns An array of my Instagram posts.
 */
export async function getInstagramPosts(): Promise<ActionResponse<Post[]>> {
    // Refresh the access token if necessary.
    await refreshToken();

    let data: Post[] = [];
    const fields = [
        "caption",
        "id",
        "media_type",
        "media_url",
        "permalink",
        "timestamp",
        "username",
        "children{media_type, media_url}",
    ].join(",");

    const query = `fields=${fields}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`;
    const endpoints = [
        process.env.INSTAGRAM_USER_ID
            ? `https://graph.instagram.com/v22.0/${process.env.INSTAGRAM_USER_ID}/media?${query}`
            : null,
        `https://graph.instagram.com/v22.0/me/media?${query}`,
        `https://graph.instagram.com/me/media?${query}`,
    ].filter((endpoint): endpoint is string => endpoint !== null);

    let lastError: Error | null = null;

    try {
        const attempts = await Promise.all(endpoints.map(async (endpoint) => {
            const response = await fetch(endpoint, { cache: "no-store" });

            if (!response.ok) {
                const body = await response.text();

                return {
                    data: null,
                    error: new Error(`Failed to fetch Instagram posts (${response.status}): ${body}`),
                };
            }

            const payload = await response.json() as DataRes;

            return { data: payload.data, error: null };
        }));

        const firstSuccess = attempts.find(
            (attempt): attempt is { data: Post[]; error: null; } => attempt.data !== null,
        );

        if (firstSuccess)
            ({ data } = firstSuccess);

        lastError = attempts.find((attempt) => attempt.error !== null)?.error ?? null;

        if (!data.length && lastError)
            throw lastError;
    } catch (error) {
        return {
            error: error instanceof Error ? error : new Error("Internal server error"),
            success: false,
        };
    }

    data = data.filter((post) => !post.permalink.startsWith("https://www.instagram.com/reel/"));
    const head = data.find((post) => post.caption?.includes("#pin"));
    const tail = data.filter((post) => post.id !== head?.id);

    return {
        data: head ? [head, ...tail] : tail,
        success: true,
    };
}

/**
 * Uses the Behold API to get the latest Instagram posts.
 * Temporary solution until I can get the Instagram API to work.
 * Only the latest six posts are fetched, as I'm not paying for a temporary fix.
 * @returns The latest Instagram posts.
 */
export async function behold(): Promise<ActionResponse<BeholdPost[]>> {
    const url = "https://feeds.behold.so/waaIKjdqb9WsriY3BCih";

    try {
        const response = await fetch(url);
        const data = await response.json() as { posts: BeholdPost[]; };

        return { data: data.posts, success: true };
    } catch (error) {
        return {
            error: error instanceof Error ? error : new Error(String(error)),
            success: false,
        };
    }
}
