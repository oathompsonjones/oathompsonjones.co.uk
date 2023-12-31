import type { IAPIResponse, IRepo } from ".";
import Config from "config";
import { NextResponse } from "next/server";
import axios from "axios";
import {  generateImage } from ".";
import { graphql } from "@octokit/graphql";

export async function GET(): Promise<NextResponse> {
    const graphqlWithAuth = graphql.defaults(Config.github);
    const { user: { repositories: { repos } } } = await graphqlWithAuth<IAPIResponse>(`{
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

    const imageBinaries: Array<{ data: string; }> = await Promise.all(repos.map(async (repo) => axios.get(
        repo.openGraphImageUrl,
        { responseType: "arraybuffer" }
    )));
    const formattedRepos: IRepo[] = repos.map((repo, i) => ({
        ...repo,
        image: generateImage(imageBinaries, i)
    }));
    return NextResponse.json(formattedRepos);
}
