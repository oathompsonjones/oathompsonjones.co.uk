import { Button, Stack } from "@mui/material";
import type { ReactNode } from "react";
import { useCallback } from "react";
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
 * @returns The palette colour action controls.
 */
export function PaletteColourActions(props: PaletteColourActionsProps): ReactNode {
    const moveUp = useCallback((): void => {
        props.onMove(props.index, -1);
    }, [props]);

    const moveDown = useCallback((): void => {
        props.onMove(props.index, 1);
    }, [props]);

    const duplicate = useCallback((): void => {
        props.onDuplicate(props.entry);
    }, [props]);

    const remove = useCallback((): void => {
        props.onRemove(props.entry.id);
    }, [props]);

    return (
        <Stack direction="row" spacing={0.5} sx={{ justifyContent: "space-between" }}>
            <Stack direction="row" spacing={0.5}>
                <Button disabled={props.index === 0} onClick={moveUp} size="small">
                    Move up
                </Button>
                <Button disabled={props.index === props.total - 1} onClick={moveDown} size="small">
                    Move down
                </Button>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Button onClick={duplicate} size="small">Duplicate</Button>
                <Button color="error" disabled={props.total === 1} onClick={remove} size="small">
                    Remove
                </Button>
            </Stack>
        </Stack>
    );
}
