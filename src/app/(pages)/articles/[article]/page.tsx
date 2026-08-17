import Markdown from "react-markdown";
import type { ReactNode } from "react";
import { getGithubArticleFile } from "actions/articles";

/**
 * This page contains a collection of articles that I have written.
 * @param props - The page props.
 * @param props.params - The page params.
 * @returns An articles page.
 */
export default async function Articles({ params }: { params: Promise<{ article: string; }>; }): Promise<ReactNode> {
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
