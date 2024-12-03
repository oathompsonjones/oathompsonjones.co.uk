"use server";

import { Canvas, Image } from "canvas";
import type { ActionResponse } from ".";
import { graphql } from "@octokit/graphql";

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

type APIResponse = {
    user: {
        organizations: {
            orgs: Array<{
                repositories: {
                    repos: Repo[];
                };
            }>;
        };
        repositories: {
            repos: Repo[];
        };
    };
};

/**
 * Generates an image from an image binary.
 * @param arrayBuffer - The binary data of the image.
 * @returns The resized image.
 */
function generateImage(arrayBuffer: ArrayBuffer): string {
    const average = (l: Uint8ClampedArray): number => l.reduce((a, b) => a + b, 0) / l.length;
    const colourToHex = (c: number): string => Math.round(c).toString(16).padStart(2, "0");

    const image: Image = new Image();

    image.src = Buffer.from(arrayBuffer);

    // Get the average colour of the image.
    let canvas = new Canvas(image.width, image.height);
    let context = canvas.getContext("2d");

    context.drawImage(image, 0, 0);
    const { data } = context.getImageData(0, 0, image.width, image.height);
    const colour = {
        b: average(data.filter((_, j) => j % 4 === 2)),
        g: average(data.filter((_, j) => j % 4 === 1)),
        r: average(data.filter((_, j) => j % 4 === 0)),
    };

    // Create a canvas in order to resize the image.
    canvas = new Canvas(1280, 640);
    context = canvas.getContext("2d");

    // Fill the canvas background with the colour.
    context.fillStyle = `#${colourToHex(colour.r)}${colourToHex(colour.g)}${colourToHex(colour.b)}`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the image with the correct dimensions.
    let [dw, dh, dx] = [image.width, image.height, 0];

    if (image.height >= image.width) {
        dh = canvas.height;
        dw = dh / image.height * image.width;
        dx = (canvas.width - dw) / 2;
    } else {
        dw = canvas.width;
        dh = image.height / image.width * canvas.width;
    }

    context.drawImage(image, dx, 0, dw, dh);

    return `data:image/png;base64,${canvas.toBuffer().toString("base64")}`;
}

/**
 * Fetches all of my repositories from GitHub.
 * @returns An array of all of my repositories.
 */
export async function getGithubRepos(): Promise<ActionResponse<Repo[]>> {
    let data: Repo[] = [];

    // Fetch the repositories from GitHub.
    try {
        const graphqlWithAuth = graphql.defaults({ headers: { authorization: process.env.GITHUB_TOKEN } });

        ({ user: { repositories: { repos: data } } } = await graphqlWithAuth<APIResponse>(`{
            user(login: "oathompsonjones") {
                repositories(first: 100, isFork: false, ownerAffiliations: OWNER) {
                    repos: nodes {
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
                    }
                }
            }
        }`));
    } catch (error) {
        return {
            error: error instanceof Error ? error : new Error("Failed to fetch the repositories."),
            success: false,
        };
    }

    // Fetch the images for the repositories.
    const imageArrayBuffers: ArrayBuffer[] = await Promise.all(
        data.map(async (repo) => fetch(repo.openGraphImageUrl).then(async (res) => res.arrayBuffer())),
    );

    for (let i = 0; i < imageArrayBuffers.length; i++)
        data[i++]!.image = generateImage(imageArrayBuffers[i]!);

    // Return the list of repositories.
    return {
        data,
        success: true,
    };
}
