"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { type ChangeEvent, type MouseEvent, type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import type { Repo, RepoPage } from "actions/github";
import { GitHubRepo } from "components/pages/portfolio/githubRepo";
import type { InfinitePaginationPage } from "hooks/useInfinitePagination";
import { Masonry } from "@mui/lab";
import { RepositoryArchiveControls } from "components/pages/portfolio/repositoryArchiveControls";
import { useInfinitePagination } from "hooks/useInfinitePagination";

type RepoFilters = {
    language: string;
    topic: string;
};

type RepositoryArchiveProps = {
    readonly initialPage: RepoPage;
};

const EMPTY_FILTERS: RepoFilters = { language: "", topic: "" };

/**
 * Prevents multi-word qualifier values from being parsed as separate terms.
 * @param value - A raw value supplied for a GitHub query qualifier.
 * @returns The value, quoted if necessary.
 */
function quoteQualifierValue(value: string): string {
    return value.includes(" ") ? `"${value}"` : value;
}

/**
 * Builds a GitHub search query from a free-text search term and a set of
 * filters, without mutating what is shown in the search bar itself.
 * @param term - The free-text search term.
 * @param filters - The active filters.
 * @returns The combined GitHub search query.
 */
function buildSearchQuery(term: string, filters: RepoFilters): string {
    const parts = [];

    if (term.trim() !== "")
        parts.push(term.trim());

    if (filters.language.trim() !== "")
        parts.push(`language:${quoteQualifierValue(filters.language.trim())}`);

    if (filters.topic.trim() !== "")
        parts.push(`topic:${quoteQualifierValue(filters.topic.trim())}`);

    return parts.join(" ");
}

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
 * Converts a GitHub repository page into the generic page format expected
 * by the infinite pagination hook.
 * @param page - The GitHub repository page.
 * @returns A generic pagination page.
 */
function toPaginationPage(page: RepoPage): InfinitePaginationPage<Repo> {
    return {
        endCursor: page.pageInfo.endCursor,
        hasNextPage: page.pageInfo.hasNextPage,
        items: page.repos,
    };
}

/**
 * Renders an infinite-scroll repository archive.
 * @param props - Component properties.
 * @param props.initialPage - The first server-rendered page of repositories.
 * @returns An element which renders the repository archive.
 */
export function RepositoryArchive({ initialPage }: RepositoryArchiveProps): ReactNode {
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState<RepoFilters>(EMPTY_FILTERS);
    const [activeSearch, setActiveSearch] = useState("");
    const [filterAnchor, setFilterAnchor] = useState<HTMLButtonElement | null>(null);
    const [searchError, setSearchError] = useState<string | null>(null);

    const activeFilters = useMemo(
        () => (Object.entries(filters) as Array<[keyof RepoFilters, string]>)
            .filter(([, value]) => value.trim() !== ""),
        [filters],
    );

    // Removes a single filter, keeping the rest of the active filters intact.
    const removeFilter = useCallback((key: keyof RepoFilters) => {
        setFilters((prev) => ({ ...prev, [key]: "" }));
    }, []);
    const openFilters = useCallback((event: MouseEvent<HTMLButtonElement>): void => {
        setFilterAnchor(event.currentTarget);
    }, []);
    const closeFilters = useCallback((): void => setFilterAnchor(null), []);
    const updateLanguage = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setFilters((prev) => ({ ...prev, language: event.target.value }));
    }, []);
    const updateTopic = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setFilters((prev) => ({ ...prev, topic: event.target.value }));
    }, []);
    const clearFilters = useCallback((): void => setFilters(EMPTY_FILTERS), []);
    const updateSearchTerm = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(event.target.value);
    }, []);

    // Fetches a page of repositories from the GitHub API.
    const fetchPage = useCallback(async (
        { cursor }: { cursor: string | null; },
    ): Promise<InfinitePaginationPage<Repo>> => {
        const params = new URLSearchParams({ size: "10" });

        if (cursor !== null)
            params.set("after", cursor);

        if (activeSearch !== "")
            params.set("search", activeSearch);

        const response = await fetch(`/api/github/repos?${params.toString()}`);
        const payload = await response.json() as RepoPageResponse;

        if (!response.ok || !payload.success)
            throw new Error(payload.success ? "Failed to load repositories." : payload.error);

        return toPaginationPage(payload.data);
    }, [activeSearch]);

    const { items: repos, hasNextPage, isLoading, error, retry, reset } = useInfinitePagination<Repo>({
        fetchPage,
        getItemKey: (repo) => repo.nameWithOwner,
        initialPage: toPaginationPage(initialPage),
    });

    const fetchSearchResults = useCallback(async (): Promise<void> => {
        const search = buildSearchQuery(searchTerm, filters);

        if (search === activeSearch)
            return;

        setActiveSearch(search);

        try {
            const params = new URLSearchParams({ size: "10" });

            if (search !== "")
                params.set("search", search);

            const response = await fetch(`/api/github/repos?${params.toString()}`);
            const payload = await response.json() as RepoPageResponse;

            if (!response.ok || !payload.success)
                throw new Error(payload.success ? "Failed to load repositories." : payload.error);

            setSearchError(null);
            reset(toPaginationPage(payload.data));
        } catch (caught) {
            setSearchError(caught instanceof Error ? caught.message : "Failed to load repositories.");
        }
    }, [activeSearch, filters, reset, searchTerm]);

    /**
     * Applies the search after a short debounce.
     *
     * The search bar only ever reflects `searchTerm`; filters are merged
     * into the underlying GitHub search query without being shown there.
     * The hook itself remains completely unaware of searching; changing
     * the query simply causes this component to fetch a new first page
     * and reset the pagination state.
     */
    useEffect(() => {
        const timeout = window.setTimeout(() => {
            void fetchSearchResults();
        }, 300);

        return (): void => clearTimeout(timeout);
    }, [fetchSearchResults]);

    return (
        <Stack sx={{ gap: 2 }}>
            <RepositoryArchiveControls
                activeFilters={activeFilters}
                clearFilters={clearFilters}
                closeFilters={closeFilters}
                filterAnchor={filterAnchor}
                filters={filters}
                onRemoveFilter={removeFilter}
                openFilters={openFilters}
                searchTerm={searchTerm}
                updateLanguage={updateLanguage}
                updateSearchTerm={updateSearchTerm}
                updateTopic={updateTopic}
            />

            {repos.length === 0 && !isLoading && error === null && (
                <Typography color="text.secondary" variant="caption">
                    No repositories found.
                </Typography>
            )}

            <Masonry columns={{ lg: 4, md: 3, sm: 2, xl: 5, xs: 1 }}>
                {repos.map((repo) => (<GitHubRepo key={repo.nameWithOwner} repo={repo} />))}
            </Masonry>

            <Box
                sx={{
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

            {(error !== null || searchError !== null) && (
                <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ alignItems: "center", justifyContent: "center" }}
                >
                    <Typography color="error" variant="caption">{searchError ?? error}</Typography>
                    <Button onClick={retry} size="small" variant="text">Retry</Button>
                </Stack>
            )}
        </Stack>
    );
}
