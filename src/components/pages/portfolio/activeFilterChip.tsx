import { type ReactNode, useCallback } from "react";
import { Chip } from "@mui/material";

export type RepositoryFilterKey = "language" | "topic";

const FILTER_LABELS: Record<RepositoryFilterKey, string> = {
    language: "Language",
    topic: "Topic",
};

export type ActiveFilterChipProps = {
    readonly filterKey: RepositoryFilterKey;
    readonly onRemove: (key: RepositoryFilterKey) => void;
    readonly value: string;
};

/**
 * Displays an active repository filter and provides a removal control.
 * @param props - Active filter details and removal callback.
 * @param props.filterKey - The type of repository filter.
 * @param props.onRemove - Removes the selected filter.
 * @param props.value - The selected filter value.
 * @returns A filter chip.
 */
export function ActiveFilterChip({ filterKey, onRemove, value }: ActiveFilterChipProps): ReactNode {
    const remove = useCallback((): void => {
        onRemove(filterKey);
    }, [filterKey, onRemove]);

    return (
        <Chip
            label={`${FILTER_LABELS[filterKey]}: ${value}`}
            onDelete={remove}
            size="small"
        />
    );
}
