import { Button, MenuItem, Stack, TextField } from "@mui/material";
import type { ChangeEvent, ReactNode } from "react";
import type { HarmonyMode } from "tools/colour/palette";

const HARMONY_OPTIONS: Array<{ label: string; value: HarmonyMode; }> = [
    { label: "Complementary", value: "complementary" },
    { label: "Analogous", value: "analogous" },
    { label: "Triadic", value: "triadic" },
    { label: "Split-complementary", value: "split-complementary" },
    { label: "Tetradic", value: "tetradic" },
];

type PaletteControlsProps = {
    harmony: HarmonyMode;
    colourCount: number;
    maxColours: number;
    valid: boolean;
    copied: boolean;
    onHarmonyChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onGenerateHarmony: () => void;
    onAddColour: () => void;
    onCopyCss: () => void;
};

/** Displays the palette's harmony, add-colour, and export controls. */
export function PaletteControls({
    harmony,
    colourCount,
    maxColours,
    valid,
    copied,
    onHarmonyChange,
    onGenerateHarmony,
    onAddColour,
    onCopyCss,
}: PaletteControlsProps): ReactNode {
    return (
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap", gap: 1 }}>
            <TextField
                label="Harmony"
                onChange={onHarmonyChange}
                select
                size="small"
                sx={{ minWidth: 220 }}
                value={harmony}
            >
                {HARMONY_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <Button onClick={onGenerateHarmony} variant="outlined">Generate harmony from first colour</Button>
            <Button disabled={colourCount >= maxColours} onClick={onAddColour} variant="contained">
                Add colour
            </Button>
            <Button disabled={!valid} onClick={onCopyCss}>{copied ? "CSS copied" : "Copy CSS"}</Button>
        </Stack>
    );
}
