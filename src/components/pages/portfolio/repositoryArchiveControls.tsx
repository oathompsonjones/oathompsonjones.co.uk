import { ActiveFilterChip, type RepositoryFilterKey } from "components/pages/portfolio/activeFilterChip";
import { Badge, Button, IconButton, Popover, Stack, TextField, Typography } from "@mui/material";
import type { ChangeEventHandler, MouseEventHandler, ReactNode } from "react";
import { FilterList, Search } from "@mui/icons-material";

type RepoFilters = Record<RepositoryFilterKey, string>;

export type RepositoryArchiveControlsProps = {
    readonly activeFilters: ReadonlyArray<[RepositoryFilterKey, string]>;
    readonly clearFilters: () => void;
    readonly closeFilters: () => void;
    readonly filterAnchor: HTMLButtonElement | null;
    readonly filters: RepoFilters;
    readonly onRemoveFilter: (key: RepositoryFilterKey) => void;
    readonly openFilters: MouseEventHandler<HTMLButtonElement>;
    readonly searchTerm: string;
    readonly updateLanguage: ChangeEventHandler<HTMLInputElement>;
    readonly updateSearchTerm: ChangeEventHandler<HTMLInputElement>;
    readonly updateTopic: ChangeEventHandler<HTMLInputElement>;
};

/**
 * Renders repository search controls and active filters.
 * @param props - The search, filter, and popover control properties.
 * @param props.activeFilters - The non-empty filters currently applied.
 * @param props.clearFilters - Clears every active filter.
 * @param props.closeFilters - Closes the filter popover.
 * @param props.filterAnchor - The element anchoring the filter popover.
 * @param props.filters - Current filter input values.
 * @param props.onRemoveFilter - Removes one active filter.
 * @param props.openFilters - Opens the filter popover.
 * @param props.searchTerm - The search text visible to the user.
 * @param props.updateLanguage - Updates the language filter.
 * @param props.updateSearchTerm - Updates the visible search text.
 * @param props.updateTopic - Updates the topic filter.
 * @returns Repository search controls.
 */
export function RepositoryArchiveControls({
    activeFilters,
    clearFilters,
    closeFilters,
    filterAnchor,
    filters,
    onRemoveFilter,
    openFilters,
    searchTerm,
    updateLanguage,
    updateSearchTerm,
    updateTopic,
}: RepositoryArchiveControlsProps): ReactNode {
    const searchAdornment = <Search fontSize="small" sx={{ color: "text.secondary" }} />;

    return (
        <Stack
            direction="row"
            sx={{ alignItems: "center", flexWrap: "wrap", gap: 2, justifyContent: "space-between" }}
        >
            <Typography variant="h4">Repository Archive</Typography>

            <Stack direction="row" sx={{ alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                {activeFilters.map(([key, value]) => (
                    <ActiveFilterChip
                        filterKey={key}
                        key={key}
                        onRemove={onRemoveFilter}
                        value={value}
                    />
                ))}

                <Badge badgeContent={activeFilters.length} color="primary">
                    <IconButton aria-label="Filter repositories" onClick={openFilters}>
                        <FilterList fontSize="small" />
                    </IconButton>
                </Badge>

                <Popover
                    anchorEl={filterAnchor}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    onClose={closeFilters}
                    open={filterAnchor !== null}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                >
                    <Stack sx={{ gap: 2, minWidth: 250, p: 2 }}>
                        <TextField
                            label="Language"
                            onChange={updateLanguage}
                            size="small"
                            value={filters.language}
                            variant="outlined"
                        />
                        <TextField
                            label="Topic"
                            onChange={updateTopic}
                            size="small"
                            value={filters.topic}
                            variant="outlined"
                        />
                        <Button disabled={activeFilters.length === 0} onClick={clearFilters} size="small">
                            Clear filters
                        </Button>
                    </Stack>
                </Popover>

                <TextField
                    label="Search"
                    onChange={updateSearchTerm}
                    slotProps={{ input: { endAdornment: searchAdornment } }}
                    sx={{ width: { md: 400, xs: "100%" } }}
                    value={searchTerm}
                    variant="outlined"
                />
            </Stack>
        </Stack>
    );
}
