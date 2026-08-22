"use client";

import { Search } from "@mui/icons-material";
import { Masonry } from "@mui/lab";
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import type { ReactNode } from "react";
import type { Repo, RepoPage } from "actions/github";
import { GitHubRepo } from "components/pages/portfolio/githubRepo";

type RepoPageResponse =
    | {
        data: RepoPage;
        success: true;
    }
    | {
        error: string;
        success: false;
    };

/**
 * Renders an infinite-scroll repository archive.
 * @param props - Component properties.
 * @param props.initialPage - The first server-rendered page of repositories.
 * @returns A client-side archive with incremental loading.
 */
export function RepositoryArchive({ initialPage }: { initialPage: RepoPage; }): ReactNode {
    const [repos, setRepos] = useState<Repo[]>(initialPage.repos);
    const [hasNextPage, setHasNextPage] = useState(initialPage.pageInfo.hasNextPage);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const endCursorRef = useRef<string | null>(initialPage.pageInfo.endCursor);
    const hasNextPageRef = useRef(initialPage.pageInfo.hasNextPage);
    const activeSearchRef = useRef("");

    const loadingRef = useRef(false);
    const fillingRef = useRef(false);
    const requestIdRef = useRef(0);

    /**
     * Determines whether the page is currently at the bottom.
     *
     * A page shorter than the viewport counts as being at the bottom.
     */
    const isAtBottom = useCallback((): boolean => {
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
        );

        return (
            documentHeight <= window.innerHeight ||
            window.scrollY + window.innerHeight >= documentHeight - 2
        );
    }, []);

    /**
     * Fetches exactly one page of repositories.
     *
     * @param cursor - Cursor to fetch after.
     * @param search - Search query.
     * @param replace - Whether to replace the current results.
     * @param requestId - ID of the current search request.
     * @returns Whether the request succeeded.
     */
    const fetchPage = useCallback(async (
        cursor: string | null,
        search: string,
        replace: boolean,
        requestId: number,
    ): Promise<boolean> => {
        if (loadingRef.current)
            return false;

        loadingRef.current = true;
        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({ size: "10" });

            if (cursor !== null)
                params.set("after", cursor);

            if (search !== "")
                params.set("search", search);

            const response = await fetch(`/api/github/repos?${params.toString()}`);

            const payload = await response.json() as RepoPageResponse;

            if (!response.ok || !payload.success) {
                throw new Error(
                    payload.success
                        ? "Failed to load repositories."
                        : payload.error,
                );
            }

            if (requestId !== requestIdRef.current)
                return false;

            const page = payload.data;

            setRepos((current) => {
                if (replace)
                    return page.repos;

                const seen = new Set(current.map((repo) => repo.nameWithOwner));
                return [...current, ...page.repos.filter((repo) => !seen.has(repo.nameWithOwner))];
            });

            endCursorRef.current = page.pageInfo.endCursor;
            hasNextPageRef.current = page.pageInfo.hasNextPage;

            setHasNextPage(page.pageInfo.hasNextPage);

            return true;
        } catch (err) {
            if (requestId !== requestIdRef.current)
                return false;

            setError(err instanceof Error ? err.message : "Failed to load repositories.");

            return false;
        } finally {
            loadingRef.current = false;

            if (requestId === requestIdRef.current)
                setIsLoading(false);
        }
    }, []);

    const waitForRender = useCallback(async (): Promise<void> => {
        await new Promise<void>((resolve) => {
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    resolve();
                });
            });
        });
    }, []);

    const fillViewport = useCallback(async (search: string, requestId: number): Promise<void> => {
        if (fillingRef.current)
            return;

        fillingRef.current = true;

        try {
            while (
                requestId === requestIdRef.current &&
                hasNextPageRef.current &&
                endCursorRef.current !== null
            ) {
                await waitForRender();
                if (!isAtBottom())
                    break;

                const cursor = endCursorRef.current;
                const loaded = await fetchPage(cursor, search, false, requestId);
                if (!loaded)
                    break;
            }
        } finally {
            fillingRef.current = false;
        }
    }, [fetchPage, isAtBottom, waitForRender]);

    const loadMore = useCallback((): void => {
        if (
            loadingRef.current ||
            fillingRef.current ||
            !hasNextPageRef.current ||
            endCursorRef.current === null
        ) return;

        void fillViewport(
            activeSearchRef.current,
            requestIdRef.current,
        );
    }, [fillViewport]);

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            const search = searchTerm.trim();
            const requestId = ++requestIdRef.current;

            activeSearchRef.current = search;
            setError(null);

            if (search === "") {
                endCursorRef.current =
                    initialPage.pageInfo.endCursor;

                hasNextPageRef.current =
                    initialPage.pageInfo.hasNextPage;

                setRepos(initialPage.repos);
                setHasNextPage(initialPage.pageInfo.hasNextPage);
                setIsLoading(false);

                void fillViewport("", requestId);

                return;
            }

            endCursorRef.current = null;
            hasNextPageRef.current = true;

            setRepos([]);
            setHasNextPage(true);

            void (async (): Promise<void> => {
                const loaded = await fetchPage(null, search, true, requestId);
                if (loaded)
                    await fillViewport(search, requestId);
            })();
        }, 300);

        return (): void => clearTimeout(timeout);
    }, [fetchPage, fillViewport, initialPage, searchTerm]);

    useEffect(() => {
        const onScroll = (): void => {
            if (isAtBottom())
                loadMore();
        };

        window.addEventListener("scroll", onScroll, { passive: true });

        return (): void => window.removeEventListener("scroll", onScroll);;
    }, [isAtBottom, loadMore]);

    useEffect(() => {
        const onResize = (): void => {
            if (isAtBottom())
                loadMore();
        };

        window.addEventListener("resize", onResize);

        return (): void => window.removeEventListener("resize", onResize);
    }, [isAtBottom, loadMore]);

    const retryLoad = useCallback((): void => {
        setError(null);
        void fillViewport(activeSearchRef.current, requestIdRef.current);
    }, [fillViewport]);

    return (
        <Stack sx={{ gap: 2 }}>
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                sx={{
                    m: "0 0 0 auto",
                    width: { md: 400, xs: "100%" },
                }}
                slotProps={{
                    input: {
                        endAdornment: (<Search fontSize="small" sx={{ color: "text.secondary" }} />),
                    },
                }}
            />

            <Masonry columns={{ lg: 4, md: 3, sm: 2, xl: 5, xs: 1 }}>
                {repos.map((repo, i) => (
                    <GitHubRepo
                        key={`${repo.nameWithOwner}-${i}`}
                        repo={repo}
                    />
                ))}
            </Masonry>

            <Box sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    minHeight: 64,
                }}
            >
                <Typography color="text.secondary" variant="caption">
                    {isLoading
                        ? "Loading more repositories..."
                        : `Showing ${hasNextPage ? "" : "all "}${repos.length} repositories`}
                </Typography>
            </Box>

            {error !== null && (
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", justifyContent: "center" }}>
                    <Typography color="error" variant="caption">{error}</Typography>
                    <Button onClick={retryLoad} size="small" variant="text">Retry</Button>
                </Stack>
            )}
        </Stack>
    );
}
