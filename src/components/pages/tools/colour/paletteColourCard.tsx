import { type ChangeEvent, type ReactNode, useCallback } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import { Card } from "components/card";
import type { ColourToolResult } from "tools/colour/colour-tool";
import { PaletteColourActions } from "components/pages/tools/colour/paletteColourActions";
import { normalisePaletteColour } from "tools/colour/palette";

export type PaletteEntry = Readonly<{
    id: number;
    name: string;
    value: string;
}>;

type PaletteColourCardProps = Readonly<{
    entry: PaletteEntry;
    index: number;
    total: number;
    result: ColourToolResult | undefined;
    onUpdate: (id: number, field: "name" | "value", value: string) => void;
    onDuplicate: (entry: PaletteEntry) => void;
    onRemove: (id: number) => void;
    onMove: (index: number, direction: -1 | 1) => void;
}>;

/**
 * Renders an editable card for one palette colour.
 * @param root0 - The palette entry, analysis, and update actions.
 * @param root0.entry - The palette entry being edited.
 * @param root0.index - The entry's current position.
 * @param root0.total - The number of palette entries.
 * @param root0.result - The colour analysis, if the entry is valid.
 * @param root0.onUpdate - Updates the entry's name or colour value.
 * @param root0.onDuplicate - Duplicates the entry.
 * @param root0.onRemove - Removes the entry.
 * @param root0.onMove - Moves the entry up or down.
 * @returns The editable palette colour card.
 */
export function PaletteColourCard({
    entry,
    index,
    total,
    result,
    onUpdate,
    onDuplicate,
    onRemove,
    onMove,
}: PaletteColourCardProps): ReactNode {
    const updateName = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        onUpdate(entry.id, "name", event.target.value);
    }, [entry.id, onUpdate]);

    const updateValue = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        onUpdate(entry.id, "value", event.target.value);
    }, [entry.id, onUpdate]);

    let swatch = "#808080";

    try {
        swatch = normalisePaletteColour(entry.value);
    } catch {
        // Keep a neutral swatch while the user corrects an invalid value.
    }

    return (
        <Card sx={{ height: "100%", overflow: "hidden" }}>
            <Card.Media style={{ backgroundColor: swatch, height: 96 }} />
            <Card.Content>
                <Stack spacing={1.5}>
                    <TextField
                        fullWidth
                        label="Colour name"
                        onChange={updateName}
                        size="small"
                        value={entry.name}
                    />
                    <TextField
                        fullWidth
                        helperText="HEX, RGB, HSL, HSV, HWB, CMYK, or CSS name"
                        label="Colour value"
                        onChange={updateValue}
                        size="small"
                        value={entry.value}
                    />
                    {result
                        ? (
                            <Typography color="text.secondary" variant="body2">
                                {result.hex} · Black {result.contrast.black.toFixed(2)}:1 ·
                                White {result.contrast.white.toFixed(2)}:1
                            </Typography>
                        )
                        : null}
                    <PaletteColourActions
                        entry={entry}
                        index={index}
                        onDuplicate={onDuplicate}
                        onMove={onMove}
                        onRemove={onRemove}
                        total={total}
                    />
                </Stack>
            </Card.Content>
        </Card>
    );
}
