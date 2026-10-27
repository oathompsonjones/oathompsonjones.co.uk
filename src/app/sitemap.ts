import type { MetadataRoute } from "next";
import { getGithubArticleFileNames } from "actions/articles";

const SITE_URL = "https://oathompsonjones.co.uk";

/**
 * Lists canonical public pages and published articles for search crawlers.
 * @returns The sitemap entries.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = [
        "",
        "/about",
        "/portfolio",
        "/tools",
        "/tools/json",
        "/tools/colour",
        "/tools/hash-encoding",
        "/articles",
        "/articles/project-euler",
        "/arcade",
        "/arcade/tic-tac-toe",
        "/arcade/connect-4",
        "/gallery",
        "/contact",
        "/privacy",
        "/project-euler",
    ];
    const articleResponse = await getGithubArticleFileNames();
    const articleRoutes = articleResponse.success
        ? articleResponse.data.map(({ name }) => `/articles/${name.toLowerCase().replace(/\s+/gu, "-")}`)
        : [];
    const uniqueRoutes = [...new Set([...staticRoutes, ...articleRoutes])];

    return uniqueRoutes.map((route) => ({ url: `${SITE_URL}${route}` }));
}
