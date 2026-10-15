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
 * @param props - The current state and palette control callbacks.
 * @returns The palette control row.
 */
export function PaletteControls(props: PaletteControlsProps): ReactNode {
    return (
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap", gap: 1 }}>
            <TextField
                label="Harmony"
                onChange={props.onHarmonyChange}
                select
                size="small"
                sx={{ minWidth: 220 }}
                value={props.harmony}
            >
                {HARMONY_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <Button onClick={props.onGenerateHarmony} variant="outlined">Generate harmony from first colour</Button>
            <Button
                disabled={props.colourCount >= props.maxColours}
                onClick={props.onAddColour}
                variant="contained"
            >
                Add colour
            </Button>
            <Button disabled={!props.valid} onClick={props.onCopyCss}>
                {props.copied ? "CSS copied" : "Copy CSS"}
            </Button>
        </Stack>
    );
}
