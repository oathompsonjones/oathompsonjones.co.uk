"use server";

import { Canvas, Image } from "canvas";
import type { ActionResponse } from ".";
import { graphql } from "@octokit/graphql";

type RawRepo = Omit<Repo, "image">;

export type Repo = {
    description: string;
    homepageUrl: string | null;
    image: string;
    isPrivate: boolean;
    languages: {
        nodes: Array<{
            name: string;
        }>;
    };
    name: string;
    nameWithOwner: string;
    openGraphImageUrl: string;
    primaryLanguage: {
        name: string;
    } | null;
    url: string;
};

export type RepoPage = {
    pageInfo: {
        endCursor: string | null;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string | null;
    };
    repos: Repo[];
    totalCount: number;
};

type RepoPageAPIResponse = {
    user: {
        repositories: {
            pageInfo: RepoPage["pageInfo"];
            repos: RawRepo[];
            totalCount: number;
        };
    };
};

const REPO_FIELDS = `
    description
    homepageUrl
    isPrivate
    languages(first: 10) {
        nodes {
            name
        }
    }
    name
    nameWithOwner
    openGraphImageUrl
    primaryLanguage {
        name
    }
    url
`;

/**
 * Gets the average colour of an image.
 * @param image - The image to get the average colour of.
 * @returns The average colour of the image as a hex string.
 */
function getAverageImageColour(image: Image): `#${string}` {
    const average = (l: Uint8ClampedArray): number => l.reduce((a, b) => a + b, 0) / l.length;

    const canvas = new Canvas(image.width, image.height);
    const context = canvas.getContext("2d");

    try {
        context.drawImage(image, 0, 0);
    } catch {
        return "#ffffff";
    }

    const { data } = context.getImageData(0, 0, image.width, image.height);

    return `#${[
        data.filter((_, j) => j % 4 === 0),
        data.filter((_, j) => j % 4 === 1),
        data.filter((_, j) => j % 4 === 2),
    ].map(average).map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`;
}

/**
 * Converts an array buffer to an image.
 * @param arrayBuffer - The array buffer to convert.
 * @returns The image object.
 */
function bufferToImage(arrayBuffer: ArrayBuffer): Image {
    const image = new Image();

    image.src = Buffer.from(arrayBuffer);

    return image;
}

/**
 * Generates an image from an image binary.
 * @param arrayBuffer - The binary data of the image.
 * @returns The resized image.
 */
function generateImage(arrayBuffer: ArrayBuffer): string {
    const image = bufferToImage(arrayBuffer);

    // Create a canvas in order to resize the image.
    const canvas = new Canvas(1280, 640);
    const context = canvas.getContext("2d");

    // Fill the canvas background with the colour.
    context.fillStyle = getAverageImageColour(image);
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the image with the correct dimensions.
    let [dw, dh, dx, dy] = [image.width, image.height, 0, 0];

    if (image.height >= image.width) {
        dh = canvas.height;
        dw = dh / image.height * image.width;
        dx = (canvas.width - dw) / 2;
    } else {
        dw = canvas.width;
        dh = image.height / image.width * canvas.width;
        dy = (canvas.height - dh) / 2;
    }

    try {
        context.drawImage(image, dx, dy, dw, dh);
    } catch {
        // If the image is invalid, draw nothing.
    }

    return `data:image/png;base64,${canvas.toBuffer().toString("base64")}`;
}

/**
 * Gets a GitHub GraphQL client with auth preconfigured.
 * @returns An authenticated GraphQL client.
 */
function graphqlWithAuth(): typeof graphql {
    return graphql.defaults({ headers: { authorization: process.env.GITHUB_TOKEN } });
}

/**
 * Generates portfolio card images for repositories.
 * @param repos - The repositories to process.
 * @returns The repositories with generated images.
 */
async function withRepoImages(repos: RawRepo[]): Promise<Repo[]> {
    const images = await Promise.all(repos.map(async (repo) => {
        try {
            const response = await fetch(repo.openGraphImageUrl, {
                cache: "force-cache",
                next: { revalidate: 86400 },
            });

            if (!response.ok)
                return repo.openGraphImageUrl;

            return generateImage(await response.arrayBuffer());
        } catch {
            return repo.openGraphImageUrl;
        }
    }));

    return repos.map((repo, i) => ({ ...repo, image: images[i]! }));
}

/**
 * Fetches one page of repositories from GitHub.
 * @param params - Cursor pagination parameters.
 * @param params.after - Fetches records after this cursor.
 * @param params.before - Fetches records before this cursor.
 * @param params.size - Number of repositories to fetch.
 * @returns A page of repositories.
 */
export async function getGithubReposPage({ after = null, before = null, size = 10 }: {
    after?: string | null;
    before?: string | null;
    size?: number;
} = {}): Promise<ActionResponse<RepoPage>> {
    if (after !== null && before !== null) {
        return {
            error: new Error("'after' and 'before' cannot be used together."),
            success: false,
        };
    }

    const first = before === null ? size : null;
    const last = before === null ? null : size;

    try {
        const response = await graphqlWithAuth()<RepoPageAPIResponse>(`
            query PortfolioRepos($after: String, $before: String, $first: Int, $last: Int) {
                user(login: "oathompsonjones") {
                    repositories(
                        after: $after,
                        before: $before,
                        first: $first,
                        isFork: false,
                        last: $last,
                        orderBy: { direction: DESC, field: PUSHED_AT },
                        privacy: PUBLIC,
                        ownerAffiliations: OWNER
                    ) {
                        repos: nodes {
                            ${REPO_FIELDS}
                        }
                        totalCount
                        pageInfo {
                            endCursor
                            hasNextPage
                            hasPreviousPage
                            startCursor
                        }
                    }
                }
            }
        `, { after, before, first, last });

        const repos = await withRepoImages(response.user.repositories.repos);

        return {
            data: {
                pageInfo: response.user.repositories.pageInfo,
                repos,
                totalCount: response.user.repositories.totalCount,
            },
            success: true,
        };
    } catch (error) {
        return {
            error: error instanceof Error ? error : new Error("Failed to fetch the repositories."),
            success: false,
        };
    }
}
