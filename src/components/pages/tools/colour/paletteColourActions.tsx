import { Button, Stack } from "@mui/material";
import { useCallback, type ReactNode } from "react";
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
 * @param root0 - The entry and its palette actions.
 * @param root0.entry - The palette entry being controlled.
 * @param root0.index - The entry's current position.
 * @param root0.total - The total number of palette entries.
 * @param root0.onDuplicate - Duplicates the entry.
 * @param root0.onRemove - Removes the entry.
 * @param root0.onMove - Moves the entry up or down.
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
        <Stack direction="row" spacing={0.5} sx={{ justifyContent: "space-between" }}>
            <Stack direction="row" spacing={0.5}>
                <Button disabled={index === 0} onClick={moveUp} size="small">
                    Move up
                </Button>
                <Button disabled={index === total - 1} onClick={moveDown} size="small">
                    Move down
                </Button>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Button onClick={duplicate} size="small">Duplicate</Button>
                <Button color="error" disabled={total === 1} onClick={remove} size="small">
                    Remove
                </Button>
            </Stack>
        </Stack>
    );
}
