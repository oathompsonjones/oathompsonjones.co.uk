import Markdown from "react-markdown";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getGithubArticleFile } from "actions/articles";
import { pageMetadata } from "utils";

/**
 * Creates a readable summary from the article's opening Markdown paragraph.
 * @param markdown - The article source.
 * @returns A plain text summary suitable for search snippets.
 */
function articleDescription(markdown: string): string {
    const firstParagraph = markdown
        .split(/\n\s*\n/u)
        .find((block) => block.trim().length > 0 && !block.trim().startsWith("#"));
    const plainText = (firstParagraph ?? markdown)
        .replace(/!?(\[([^\]]+)\])\([^)]*\)/gu, "$2")
        .replace(/[`*_>#]/gu, "")
        .replace(/\s+/gu, " ")
        .trim();

    return plainText.length > 160 ? `${plainText.slice(0, 157).trimEnd()}…` : plainText;
}

/**
 * Generates article-specific search and social metadata.
 * @param props - The route parameters.
 * @param props.params - The article slug.
 * @returns Metadata derived from the article content.
 */
export async function generateMetadata(
    { params }: { readonly params: Promise<{ article: string; }>; },
): Promise<Metadata> {
    const { article } = await params;
    const articleResponse = await getGithubArticleFile(article);
    const fallbackTitle = article.replace(/-/gu, " ").replace(/\b\w/gu, (letter) => letter.toUpperCase());

    if (!articleResponse.success) {
        return pageMetadata(
            fallbackTitle,
            "Read a software development article by Oliver Jones.",
            `/articles/${article}`,
        );
    }

    const markdown = articleResponse.data;
    const heading = (/^#\s+(.+)$/mu).exec(markdown)?.[1]?.trim();
    const articleTitle = heading ?? fallbackTitle;
    const description = articleDescription(markdown);

    return pageMetadata(
        articleTitle,
        description || "Read a software development article by Oliver Jones.",
        `/articles/${article}`,
    );
}

/**
 * This page contains a collection of articles that I have written.
 * @param props - The page props.
 * @param props.params - The page params.
 * @returns An articles page.
 */
export default async function Articles(
    { params }: { readonly params: Promise<{ article: string; }>; },
): Promise<ReactNode> {
    const { article } = await params;

    if (typeof article !== "string")
        throw new Error("Article not found.");

    const articleResponse = await getGithubArticleFile(article);

    if (!articleResponse.success)
        throw articleResponse.error!;

    return (
        <article>
            <Markdown>{articleResponse.data}</Markdown>
        </article>
    );
}
