"use client";

import { FilterList, Search } from "@mui/icons-material";
import { Masonry } from "@mui/lab";
import { Badge, Box, Button, Chip, IconButton, Popover, Stack, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Repo, RepoPage } from "actions/github";
import { GitHubRepo } from "components/pages/portfolio/githubRepo";
import { useInfinitePagination } from "hooks/useInfinitePagination";
import type { InfinitePaginationPage } from "hooks/useInfinitePagination";

type RepoFilters = {
    language: string;
    topic: string;
};

const EMPTY_FILTERS: RepoFilters = { language: "", topic: "" };

const FILTER_LABELS: Record<keyof RepoFilters, string> = {
    language: "Language",
    topic: "Topic",
};

/**
 * Wraps a GitHub search qualifier value in quotes if it contains whitespace.
 * @param value - The qualifier value.
 * @returns The value, quoted if necessary.
 */
function quoteQualifierValue(value: string): string {
    return value.includes(" ") ? `"${value}"` : value;
}

/**
 * Builds a GitHub search query from a free-text search term and a set of
 * filters, without mutating what is shown in the search bar itself.
 *
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
 *
 * @param page - The GitHub repository page.
 * @returns A generic pagination page.
 */
function toPaginationPage(page: RepoPage): InfinitePaginationPage<Repo> {
    return {
        items: page.repos,
        endCursor: page.pageInfo.endCursor,
        hasNextPage: page.pageInfo.hasNextPage,
    };
}

/**
 * Renders an infinite-scroll repository archive.
 * @param props - Component properties.
 * @param props.initialPage - The first server-rendered page of repositories.
 * @returns An element which renders the repository archive.
 */
export function RepositoryArchive({ initialPage }: { initialPage: RepoPage; }): ReactNode {
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState<RepoFilters>(EMPTY_FILTERS);
    const [activeSearch, setActiveSearch] = useState("");
    const [filterAnchor, setFilterAnchor] = useState<HTMLButtonElement | null>(null);

    const activeFilters = useMemo(
        () => (Object.entries(filters) as Array<[keyof RepoFilters, string]>)
            .filter(([, value]) => value.trim() !== ""),
        [filters],
    );

    // Removes a single filter, keeping the rest of the active filters intact.
    const removeFilter = useCallback((key: keyof RepoFilters) => {
        setFilters((prev) => ({ ...prev, [key]: "" }));
    }, []);

    // Fetches a page of repositories from the GitHub API.
    const fetchPage = useCallback(async ({ cursor }: { cursor: string | null; }): Promise<InfinitePaginationPage<Repo>> => {
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
        initialPage: toPaginationPage(initialPage),
        fetchPage,
        getItemKey: (repo) => repo.nameWithOwner,
    });

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
        const timeout = window.setTimeout(async () => {
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

                reset(toPaginationPage(payload.data));
            } catch { }
        }, 300);

        return (): void => clearTimeout(timeout);
    }, [activeSearch, filters, reset, searchTerm]);

    return (
        <Stack sx={{ gap: 2 }}>
            <Stack
                direction="row"
                sx={{ alignItems: "center", flexWrap: "wrap", gap: 2, justifyContent: "space-between" }}
            >
                <Typography variant="h4">Repository Archive</Typography>

                <Stack direction="row" sx={{ alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                    {activeFilters.map(([key, value]) => (
                        <Chip
                            key={key}
                            label={`${FILTER_LABELS[key]}: ${value}`}
                            onDelete={() => removeFilter(key)}
                            size="small"
                        />
                    ))}

                    <Badge badgeContent={activeFilters.length} color="primary">
                        <IconButton
                            aria-label="Filter repositories"
                            onClick={(event) => setFilterAnchor(event.currentTarget)}
                        >
                            <FilterList fontSize="small" />
                        </IconButton>
                    </Badge>

                    <Popover
                        anchorEl={filterAnchor}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        onClose={() => setFilterAnchor(null)}
                        open={filterAnchor !== null}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                    >
                        <Stack sx={{ gap: 2, minWidth: 250, p: 2 }}>
                            <TextField
                                label="Language"
                                onChange={(event) => setFilters((prev) => ({ ...prev, language: event.target.value }))}
                                size="small"
                                value={filters.language}
                                variant="outlined"
                            />
                            <TextField
                                label="Topic"
                                onChange={(event) => setFilters((prev) => ({ ...prev, topic: event.target.value }))}
                                size="small"
                                value={filters.topic}
                                variant="outlined"
                            />
                            <Button
                                disabled={activeFilters.length === 0}
                                onClick={() => setFilters(EMPTY_FILTERS)}
                                size="small"
                            >
                                Clear filters
                            </Button>
                        </Stack>
                    </Popover>

                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        sx={{ width: { md: 400, xs: "100%" } }}
                        slotProps={{ input: { endAdornment: (<Search fontSize="small" sx={{ color: "text.secondary" }} />) } }}
                    />
                </Stack>
            </Stack>

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

            {error !== null && (
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", justifyContent: "center" }}>
                    <Typography color="error" variant="caption">{error}</Typography>
                    <Button onClick={retry} size="small" variant="text">Retry</Button>
                </Stack>
            )}
        </Stack>
    );
}
