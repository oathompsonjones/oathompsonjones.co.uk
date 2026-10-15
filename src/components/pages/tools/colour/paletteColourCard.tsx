import { Button, Stack, TextField, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { Card } from "components/card";
import type { ColourToolResult } from "tools/colour/colour-tool";
import { normalisePaletteColour } from "tools/colour/palette";

export type PaletteEntry = {
    id: number;
    name: string;
    value: string;
};

type PaletteColourCardProps = {
    entry: PaletteEntry;
    index: number;
    total: number;
    result?: ColourToolResult;
    onUpdate: (id: number, field: "name" | "value", value: string) => void;
    onDuplicate: (entry: PaletteEntry) => void;
    onRemove: (id: number) => void;
    onMove: (index: number, direction: -1 | 1) => void;
};

type PaletteColourActionsProps = Pick<
    PaletteColourCardProps,
    "entry" | "index" | "total" | "onDuplicate" | "onRemove" | "onMove"
>;

/** Renders the controls for rearranging, duplicating, and removing a palette colour. */
function PaletteColourActions({
    entry,
    index,
    total,
    onDuplicate,
    onRemove,
    onMove,
}: PaletteColourActionsProps): ReactNode {
    return (
        <Stack direction="row" spacing={0.5} sx={{ justifyContent: "space-between" }}>
            <Stack direction="row" spacing={0.5}>
                <Button disabled={index === 0} onClick={() => onMove(index, -1)} size="small">
                    Move up
                </Button>
                <Button disabled={index === total - 1} onClick={() => onMove(index, 1)} size="small">
                    Move down
                </Button>
            </Stack>
            <Stack direction="row" spacing={0.5}>
                <Button onClick={() => onDuplicate(entry)} size="small">Duplicate</Button>
                <Button color="error" disabled={total === 1} onClick={() => onRemove(entry.id)} size="small">
                    Remove
                </Button>
            </Stack>
        </Stack>
    );
}

/** Renders an editable card for one palette colour. */
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
                        onChange={(event) => onUpdate(entry.id, "name", event.target.value)}
                        size="small"
                        value={entry.name}
                    />
                    <TextField
                        fullWidth
                        helperText="HEX, RGB, HSL, HSV, HWB, CMYK, or CSS name"
                        label="Colour value"
                        onChange={(event) => onUpdate(entry.id, "value", event.target.value)}
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
