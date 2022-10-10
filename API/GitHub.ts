import { Canvas, Image } from "canvas";
import { Request, Response } from "express";
import Config from "../Config";
import axios from "axios";
import { graphql } from "@octokit/graphql";

export interface IRepo {
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
    };
    url: string;
}

export interface IAPIResponse {
    user: {
        organizations: {
            orgs: Array<{
                repositories: {
                    repos: IRepo[];
                };
            }>;
        };
        repositories: {
            repos: IRepo[];
        };
    };
}

export async function requestHandler(_req: Request, res: Response): Promise<void> {
    try {
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
            }
        }`);
        const formattedRepos: IRepo[] = [];
        for (const repo of repos.concat(orgs.map((org) => org.repositories.repos).flat())) {
            // Create the image.
            const image: Image = new Image();
            image.src = Buffer.from((await axios.get(repo.openGraphImageUrl, { responseType: "arraybuffer" })).data, "binary");
            // Create a canvas in order to resize the image.
            const canvas = new Canvas(1280, 640);
            const context = canvas.getContext("2d");
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
            // Add the image to the repo object.
            formattedRepos.push({ ...repo, image: `data:image/png;base64,${canvas.toBuffer().toString("base64")}` });
        }
        res.send(formattedRepos);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}