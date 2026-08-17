"use server";

import type { ActionResponse } from ".";
import { graphqlWithAuth } from "./github";

const GITHUB_OWNER = "oathompsonjones";
const GITHUB_REPO = "oathompsonjones.co.uk";
const ARTICLES_BRANCH = "articles";
const ARTICLE_CONTENT_PREVIEW_LENGTH = 500;

type GitHubTreeEntry = {
    path: string;
    type: "blob" | "commit" | "tree";
};

type GitHubTreeQueryResponse = {
    repository: {
        object: {
            entries: GitHubTreeEntry[];
        } | null;
        ref: {
            target: {
                tree: {
                    entries: GitHubTreeEntry[];
                };
            };
        } | null;
    };
};

/**
 * A file name, path, and content in the articles branch.
 */
export type ArticleFileName = {
    content: string;
    name: string;
    path: string;
};

/**
 * Extracts the basename segment from a slash-delimited path.
 * @param path - A repository path such as "posts/intro.md".
 * @returns The basename segment such as "intro.md".
 */
function fileNameFromPath(path: string): string {
    return path.slice(path.lastIndexOf("/") + 1);
}

/**
 * Removes a markdown extension from a file name when present.
 * @param fileName - The file name or path segment.
 * @returns The file name without a trailing .md extension.
 */
function removeMdExt(fileName: string): string {
    return fileName.replace(/\.md$/i, "");
}

/**
 * Gets the direct entries for a tree path.
 * @param path - The tree path, or an empty string for the branch root.
 * @returns The entries directly contained in that tree.
 */
async function getTreeEntries(path = ""): Promise<GitHubTreeEntry[]> {
    const gql = await graphqlWithAuth();

    if (path.length === 0) {
        const response = await gql<GitHubTreeQueryResponse>(
            `query ArticleRootTree($owner: String!, $repo: String!, $qualifiedName: String!) {
                repository(owner: $owner, name: $repo) {
                    ref(qualifiedName: $qualifiedName) {
                        target {
                            ... on Commit {
                                tree {
                                    entries {
                                        path
                                        type
                                    }
                                }
                            }
                        }
                    }
                }
            }`,
            {
                owner: GITHUB_OWNER,
                qualifiedName: `refs/heads/${ARTICLES_BRANCH}`,
                repo: GITHUB_REPO,
            },
        );

        const entries = response.repository.ref?.target.tree.entries;

        if (entries === undefined)
            throw new Error("GitHub branch tree could not be resolved.");

        return entries;
    }

    const response = await gql<GitHubTreeQueryResponse>(
        `query ArticleTree($owner: String!, $repo: String!, $expression: String!) {
            repository(owner: $owner, name: $repo) {
                object(expression: $expression) {
                    ... on Tree {
                        entries {
                            path
                            type
                        }
                    }
                }
            }
        }`,
        {
            expression: `${ARTICLES_BRANCH}:${path}`,
            owner: GITHUB_OWNER,
            repo: GITHUB_REPO,
        },
    );

    const entries = response.repository.object?.entries;

    if (entries === undefined)
        throw new Error(`"${path}" is not a tree.`);

    return entries;
}

/**
 * Gets all article file names and content from a tree path.
 * @param path - The tree path, or an empty string for the branch root.
 * @returns The file data found beneath that tree.
 */
async function getArticleFileNamesFromPath(path = ""): Promise<ArticleFileName[]> {
    const entries = await getTreeEntries(path);
    const fileGroups = await Promise.all(entries.map(async (entry): Promise<ArticleFileName[]> => {
        if (entry.type === "tree")
            return getArticleFileNamesFromPath(entry.path);

        if (entry.type === "blob") {
            const content = await getArticleContent(entry.path);

            return [
                {
                    content: content.slice(0, ARTICLE_CONTENT_PREVIEW_LENGTH),
                    name: removeMdExt(fileNameFromPath(entry.path)),
                    path: entry.path,
                },
            ];
        }

        return [];
    }));

    return fileGroups.flat();
}

/**
 * Resolves a basename or path to a unique branch path.
 * @param fileName - The input file name or path.
 * @param paths - All candidate branch paths.
 * @returns The resolved branch path or null when no match exists.
 * @throws {Error} When multiple files share the same basename.
 */
function resolveArticlePath(fileName: string, paths: string[]): string | null {
    const normalized = fileName.replace(/^\/+/, "");

    if (paths.includes(normalized))
        return normalized;

    if (!normalized.endsWith(".md")) {
        const markdownPath = `${normalized}.md`;

        if (paths.includes(markdownPath))
            return markdownPath;
    }

    const normalizedSlug = removeMdExt(normalized);
    const matches = paths.filter((path) => {
        const candidateName = fileNameFromPath(path);

        return candidateName === normalized || removeMdExt(candidateName) === normalizedSlug;
    });

    if (matches.length === 1)
        return matches[0] ?? null;

    if (matches.length > 1)
        throw new Error(`Multiple files named "${fileName}" were found. Use the relative path instead.`);

    return null;
}

/**
 * Gets file content for a path in the articles branch.
 * @param path - The branch-relative file path.
 * @returns The file content.
 */
async function getArticleContent(path: string): Promise<string> {
    type GitHubBlobQueryResponse = {
        repository: {
            object: {
                byteSize: number;
                oid: string;
                text: string | null;
            } | null;
        };
    };

    const gql = await graphqlWithAuth();
    const response = await gql<GitHubBlobQueryResponse>(
        `query ArticleBlob($owner: String!, $repo: String!, $expression: String!) {
            repository(owner: $owner, name: $repo) {
                object(expression: $expression) {
                    ... on Blob {
                        byteSize
                        oid
                        text
                    }
                }
            }
        }`,
        {
            expression: `${ARTICLES_BRANCH}:${path}`,
            owner: GITHUB_OWNER,
            repo: GITHUB_REPO,
        },
    );

    const blob = response.repository.object;

    if (blob === null)
        throw new Error(`"${path}" is not a file.`);

    return blob.text ?? "";
}

/**
 * Gets all file names (plus paths and content previews) from the articles branch.
 * @returns An action response containing all article branch files.
 */
export async function getGithubArticleFileNames(): Promise<ActionResponse<ArticleFileName[]>> {
    try {
        const files = await getArticleFileNamesFromPath();

        return {
            data: files.sort((left, right) => left.path.localeCompare(right.path)),
            success: true,
        };
    } catch (error) {
        return {
            error: error instanceof Error ? error : new Error("Failed to fetch article file names."),
            success: false,
        };
    }
}

/**
 * Gets file content for a file in the articles branch.
 * Accepts either an exact path or a unique basename.
 * @param fileName - The file name or branch-relative path.
 * @returns An action response containing the file content.
 */
export async function getGithubArticleFile(fileName: string): Promise<ActionResponse<string>> {
    try {
        const paths = (await getArticleFileNamesFromPath()).map((file) => file.path);
        const path = resolveArticlePath(fileName, paths);

        if (path === null)
            return { error: new Error(`No file named "${fileName}" was found.`), success: false };

        return {
            data: await getArticleContent(path),
            success: true,
        };
    } catch (error) {
        return {
            error: error instanceof Error ? error : new Error("Failed to fetch article file."),
            success: false,
        };
    }
}
