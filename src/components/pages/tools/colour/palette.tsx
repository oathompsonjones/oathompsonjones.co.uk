"use client";

import { Alert, Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { colourToolResultSchema, parseHexColour, rgbToHex } from "tools/colour/colour-tool";
import type { ColourToolResult } from "tools/colour/colour-tool";
import { requestToolApi } from "tools/api";
import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import { ToolSection } from "components/pages/tools/toolSection";

const MAX_PALETTE_COLOURS = 12;
const PALETTE_LABELS = [
    "primary", "secondary", "tertiary", "quaternary", "quinary", "senary",
    "septenary", "octonary", "nonary", "denary", "eleventh", "twelfth",
] as const;

const VARIATION_NAMES: Record<string, string> = {
    "Tint": "tint",
    "Light": "light",
    "Base": "base",
    "Dark": "dark",
    "Shade": "shade",
    "Complementary": "complementary",
    "Analogous +30°": "analogous-plus-30",
    "Analogous -30°": "analogous-minus-30",
};

function createCssVariables(results: readonly ColourToolResult[]): string {
    const lines = [":root {"];

    results.forEach((result, index) => {
        const name = PALETTE_LABELS[index] ?? `colour-${index + 1}`;

        result.palette.forEach(({ hex, label }) => {
            const suffix = VARIATION_NAMES[label] ?? label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

            lines.push(`  --colour-${name}-${suffix}: ${hex};`);
        });
    });

    lines.push("}");

    return lines.join("\n");
}

/**
 * Accepts a palette of hexadecimal colours and exports all generated variants as CSS custom properties.
 * @returns The multi-colour input and CSS export section.
 */
export function ColourPaletteInput(): ReactNode {
    const [input, setInput] = useState("#1C7EEA\n#7B2CBF\n#E63946");
    const [results, setResults] = useState<ColourToolResult[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const analyse = useCallback(async (): Promise<void> => {
        const colours = input.split(/[\n,;]+/).map((colour) => colour.trim()).filter(Boolean);

        if (colours.length === 0) {
            setError("Enter at least one hexadecimal colour.");

            return;
        }

        if (colours.length > MAX_PALETTE_COLOURS) {
            setError(`Enter no more than ${MAX_PALETTE_COLOURS} colours at a time.`);

            return;
        }

        const normalised = colours.map((colour) => {
            const parsed = parseHexColour(colour);

            return parsed === null ? null : rgbToHex(parsed);
        });

        const invalid = colours.filter((_, index) => normalised[index] === null);

        if (invalid.length > 0) {
            setError(`Invalid hexadecimal colour(s): ${invalid.join(", ")}. Use #RGB or #RRGGBB.`);

            return;
        }

        setLoading(true);
        setError(null);
        setCopied(false);

        try {
            const next = await Promise.all(normalised.map((colour) =>
                requestToolApi(
                    "/api/tools/colour",
                    { colour: colour! },
                    colourToolResultSchema,
                ),
            ));

            setResults(next);
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Unable to analyse this palette.");
        } finally {
            setLoading(false);
        }
    }, [input]);

    const copyCss = useCallback(async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(createCssVariables(results));
            setCopied(true);
            setError(null);
        } catch {
            setError("Clipboard access failed. You can select and copy the CSS manually.");
        }
    }, [results]);

    return (
        <ToolSection title="Build a palette">
            <Stack spacing={2}>
                <Typography color="text.secondary" variant="body2">
                    Paste up to {MAX_PALETTE_COLOURS} hexadecimal colours, separated by new lines, commas, or semicolons.
                    Each colour gets its own contrast analysis and set of related shades.
                </Typography>
                <TextField
                    fullWidth
                    label="Palette colours"
                    minRows={3}
                    multiline
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={"#1C7EEA\n#7B2CBF\n#E63946"}
                    value={input}
                />
                <Stack alignItems="center" direction="row" flexWrap="wrap" gap={1}>
                    <Button disabled={loading} onClick={() => void analyse()} variant="contained">
                        {loading ? "Analysing…" : "Analyse palette"}
                    </Button>
                    <Button
                        disabled={loading || results.length === 0}
                        onClick={() => void copyCss()}
                    >
                        {copied ? "CSS copied" : "Copy CSS variables"}
                    </Button>
                </Stack>
                {error !== null && <Alert severity="error">{error}</Alert>}
                {results.length > 0 && (
                    <>
                        <Grid container spacing={1.5}>
                            {results.map((result, index) => (
                                <Grid key={result.hex + index} size={{ md: 4, sm: 6, xs: 12 }}>
                                    <Paper sx={{ overflow: "hidden" }}>
                                        <Paper square sx={{ backgroundColor: result.hex, height: 88 }} />
                                        <Stack p={1.5} spacing={0.5}>
                                            <Typography fontWeight={600}>
                                                {PALETTE_LABELS[index] ?? `Colour ${index + 1}`}
                                            </Typography>
                                            <Typography variant="body2">{result.hex}</Typography>
                                            <Typography color="text.secondary" variant="body2">
                                                Black {result.contrast.black.toFixed(2)}:1 · White {result.contrast.white.toFixed(2)}:1
                                            </Typography>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                        <TextField
                            fullWidth
                            label="CSS custom properties"
                            minRows={Math.min(results.length * 8 + 2, 20)}
                            multiline
                            slotProps={{ htmlInput: { readOnly: true } }}
                            value={createCssVariables(results)}
                        />
                    </>
                )}
            </Stack>
        </ToolSection>
    );
}
