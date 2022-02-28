export interface IRepo {
    description: string;
    homepageUrl: string | null;
    isFork: boolean;
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