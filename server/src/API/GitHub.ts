import { Canvas, Image } from "canvas";
import type { IAPIResponse, IRepo } from "../../../typings";
import type { Request, Response } from "express";
import Config from "../Config";
import axios from "axios";
import { graphql } from "@octokit/graphql";

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
        const combinedRepos = repos.concat(orgs.map((org) => org.repositories.repos).flat());
        const pendingImageBinaries: Array<Promise<{ data: string; }>> = combinedRepos.map(async (repo) => axios.get(repo.openGraphImageUrl, { responseType: "arraybuffer" }));
        const imageBinaries: Array<{ data: string; }> = await Promise.all(pendingImageBinaries);
        const formattedRepos: IRepo[] = [];
        combinedRepos.forEach((repo, i) => {
            // Create the image.
            const image: Image = new Image();
            image.src = Buffer.from(imageBinaries[i]!.data, "binary");
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
        });
        res.send(formattedRepos);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}