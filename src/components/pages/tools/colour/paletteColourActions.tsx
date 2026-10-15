import { Button, Stack } from "@mui/material";
import { type ReactNode, useCallback } from "react";
import type { PaletteEntry } from "components/pages/tools/colour/paletteColourCard";

type PaletteColourActionsProps = Readonly<{
    entry: PaletteEntry;
    index: number;
    total: number;
    onDuplicate: (entry: PaletteEntry) => void;
    onRemove: (id: number) => void;
    onMove: (index: number, direction: -1 | 1) => void;
}>;

/**
 * Renders the controls for rearranging, duplicating, and removing a palette colour.
 * @param props - The entry and its palette actions.
 * @param props.entry - The palette entry being controlled.
 * @param props.index - The entry's current position.
 * @param props.total - The total number of palette entries.
 * @param props.onDuplicate - Duplicates the entry.
 * @param props.onRemove - Removes the entry.
 * @param props.onMove - Moves the entry up or down.
 * @returns The palette colour action controls.
 */
export function PaletteColourActions({
    entry,
    index,
    total,
    onDuplicate,
    onRemove,
    onMove,
}: PaletteColourActionsProps): ReactNode {
    const moveUp = useCallback((): void => {
        onMove(index, -1);
    }, [index, onMove]);

    const moveDown = useCallback((): void => {
        onMove(index, 1);
    }, [index, onMove]);

    const duplicate = useCallback((): void => {
        onDuplicate(entry);
    }, [entry, onDuplicate]);

    const remove = useCallback((): void => {
        onRemove(entry.id);
    }, [entry.id, onRemove]);

    return (
        <Stack spacing={0.5} sx={{ maxWidth: "100%", width: "100%" }}>
            <Stack direction="row" spacing={0.5} sx={{ maxWidth: "100%", width: "100%" }}>
                <Button
                    disabled={index === 0}
                    onClick={moveUp}
                    size="small"
                    sx={{ flex: 1, maxWidth: "100%", minWidth: 0 }}
                >
                    Move up
                </Button>
                <Button
                    disabled={index === total - 1}
                    onClick={moveDown}
                    size="small"
                    sx={{ flex: 1, maxWidth: "100%", minWidth: 0 }}
                >
                    Move down
                </Button>
            </Stack>
            <Stack direction="row" spacing={0.5} sx={{ maxWidth: "100%", width: "100%" }}>
                <Button
                    onClick={duplicate}
                    size="small"
                    sx={{ flex: 1, maxWidth: "100%", minWidth: 0 }}
                >
                    Duplicate
                </Button>
                <Button
                    color="error"
                    disabled={total === 1}
                    onClick={remove}
                    size="small"
                    sx={{ flex: 1, maxWidth: "100%", minWidth: 0 }}
                >
                    Remove
                </Button>
            </Stack>
        </Stack>
    );
}
