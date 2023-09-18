import { Canvas, Image } from "canvas";
import type { IAPIResponse, IRepo } from "./";
import Config from "config";
import { NextResponse } from "next/server";
import axios from "axios";
import { graphql } from "@octokit/graphql";

function generateImage(imageBinaries: Array<{ data: string; }>, i: number): string {
    const image: Image = new Image();
    image.src = Buffer.from(imageBinaries[i]!.data, "binary");

    // Get the colour of the bottom left pixel of the image.
    let canvas = new Canvas(image.width, image.height);
    let context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
    const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
    const colourToHex = (colour: number): string => colour.toString(16).padStart(2, "0");
    const hexColour = `#${colourToHex(r!)}${colourToHex(g!)}${colourToHex(b!)}`;

    // Create a canvas in order to resize the image.
    canvas = new Canvas(1280, 640);
    context = canvas.getContext("2d");

    // Fill the canvas background with the colour.
    context.fillStyle = hexColour;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the image with the correct dimensions.
    let [dw, dh, dx] = [image.width, image.height, 0];
    if (image.height >= image.width) {
        dh = canvas.height;
        dw = dh / image.height * image.width;
        dx = (canvas.width - dw) / 2;
    } else if (image.height < image.width) {
        dw = canvas.width;
        dh = image.height / image.width * canvas.width;
    }
    context.drawImage(image, dx, 0, dw, dh);
    return `data:image/png;base64,${canvas.toBuffer().toString("base64")}`;
}

export async function GET(): Promise<NextResponse> {
    const graphqlWithAuth = graphql.defaults(Config.github);
    const { user: { repositories: { repos }, organizations: { orgs } } } = await graphqlWithAuth<IAPIResponse>(`{
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
    }`);
    /* To include organisations:
    organizations(first: 10) {
        orgs: nodes {
            repositories(first: 100, isFork: false) {
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
    }
    */
    const combinedRepos = repos.concat(orgs.map((org) => org.repositories.repos).flat());

    const pendingImageBinaries: Array<Promise<{ data: string; }>> = combinedRepos.map(async (repo) => axios.get(
        repo.openGraphImageUrl,
        { responseType: "arraybuffer" }
    ));
    const imageBinaries: Array<{ data: string; }> = await Promise.all(pendingImageBinaries);

    const formattedRepos: IRepo[] = [];
    combinedRepos.forEach((repo, i) => {
        const image = generateImage(imageBinaries, i);
        formattedRepos.push({ ...repo, image });
    });
    return NextResponse.json(formattedRepos);
}
