import { Button, Stack, TextField, Typography } from "@mui/material";
import { Card } from "components/card";
import { PaletteColourActions } from "components/pages/tools/colour/paletteColourActions";
import type { ReactNode, ChangeEvent } from "react";
import { useCallback } from "react";
import type { ColourToolResult } from "tools/colour/colour-tool";
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
 * @param props - The palette entry, analysis, and update actions.
 * @returns The editable palette colour card.
 */
export function PaletteColourCard(props: PaletteColourCardProps): ReactNode {
    const updateName = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        props.onUpdate(props.entry.id, "name", event.target.value);
    }, [props]);

    const updateValue = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        props.onUpdate(props.entry.id, "value", event.target.value);
    }, [props]);

    let swatch = "#808080";

    try {
        swatch = normalisePaletteColour(props.entry.value);
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
                        value={props.entry.name}
                    />
                    <TextField
                        fullWidth
                        helperText="HEX, RGB, HSL, HSV, HWB, CMYK, or CSS name"
                        label="Colour value"
                        onChange={updateValue}
                        size="small"
                        value={props.entry.value}
                    />
                    {props.result
                        ? (
                            <Typography color="text.secondary" variant="body2">
                                {props.result.hex} · Black {props.result.contrast.black.toFixed(2)}:1 ·
                                White {props.result.contrast.white.toFixed(2)}:1
                            </Typography>
                        )
                        : null}
                    <PaletteColourActions
                        entry={props.entry}
                        index={props.index}
                        onDuplicate={props.onDuplicate}
                        onMove={props.onMove}
                        onRemove={props.onRemove}
                        total={props.total}
                    />
                </Stack>
            </Card.Content>
        </Card>
    );
}
