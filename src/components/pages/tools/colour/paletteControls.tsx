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

type PaletteControlsProps = Readonly<{
    harmony: HarmonyMode;
    colourCount: number;
    maxColours: number;
    valid: boolean;
    copied: boolean;
    onHarmonyChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onGenerateHarmony: () => void;
    onAddColour: () => void;
    onCopyCss: () => void;
}>;

/**
 * Displays the palette's harmony, add-colour, and export controls.
 * @param root0 - The current state and palette control callbacks.
 * @param root0.harmony - The selected harmony mode.
 * @param root0.colourCount - The number of colours currently in the palette.
 * @param root0.maxColours - The maximum permitted palette size.
 * @param root0.valid - Whether all palette colours are valid.
 * @param root0.copied - Whether the CSS was just copied.
 * @param root0.onHarmonyChange - Handles harmony selection.
 * @param root0.onGenerateHarmony - Generates the selected harmony.
 * @param root0.onAddColour - Adds a palette colour.
 * @param root0.onCopyCss - Copies the CSS variables.
 * @returns The palette control row.
 */
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
                SelectProps={{
                    MenuProps: {
                        MenuListProps: {
                            disablePadding: true,
                        },
                    },
                }}
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
            <Button disabled={!valid} onClick={onCopyCss}>
                {copied ? "CSS copied" : "Copy CSS"}
            </Button>
        </Stack>
    );
}
