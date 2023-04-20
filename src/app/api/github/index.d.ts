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
    } | null;
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
