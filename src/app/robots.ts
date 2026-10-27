import type { MetadataRoute } from "next";

/**
 * Allows public pages to be crawled and advertises the sitemap.
 * @returns The robots.txt rules.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            allow: "/",
            disallow: "/api/",
            userAgent: "*",
        },
        sitemap: "https://oathompsonjones.co.uk/sitemap.xml",
    };
}
