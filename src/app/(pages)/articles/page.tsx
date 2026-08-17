import { Article } from "components/pages/articles/article";
import Markdown from "react-markdown";
import { Masonry } from "@mui/lab";
import type { ReactNode } from "react";
import { Typography } from "@mui/material";
import { getGithubArticleFileNames } from "actions/articles";

/**
 * This page contains a collection of articles that I have written.
 * @returns An articles page.
 */
export default async function Articles(): Promise<ReactNode> {
    const localArticles = [
        {
            content: "\nA collection of solutions to Project Euler problems.",
            name: "Project Euler",
            path: "project-euler",
        },
    ];

    const remoteArticlesResponse = await getGithubArticleFileNames();
    const remoteArticles = remoteArticlesResponse.success ? remoteArticlesResponse.data : [];

    const columns = Object.fromEntries(["xs", "sm", "md", "lg", "xl"].map((size, i) => [
        size,
        Math.min(i + 1, remoteArticles.length + localArticles.length),
    ]));

    return (
        <div>
            <Typography variant="h2" align="center" gutterBottom>Articles</Typography>
            <Masonry columns={columns}>
                {[...localArticles, ...remoteArticles].map((article) => (
                    <Article
                        key={article.path}
                        title={article.name}
                        summary={<Markdown>{article.content.split("\n").slice(1).join("\n")}</Markdown>}
                    />
                ))}
            </Masonry>
        </div>
    );
}
