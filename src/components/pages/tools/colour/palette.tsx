"use client";

import { Alert, Box, Button, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import type { ChangeEvent, ReactNode } from "react";
import {
    MAX_PALETTE_COLOURS,
    createPaletteCssVariables,
    generateHarmonyPalette,
    getPaletteContrast,
    normalisePaletteColour,
} from "tools/colour/palette";
import { useCallback, useMemo, useState } from "react";
import { Card } from "components/card";
import { Code } from "components/code";
import type { ColourToolResult } from "tools/colour/colour-tool";
import type { HarmonyMode } from "tools/colour/palette";
import { ToolSection } from "components/pages/tools/toolSection";
import { runColourTool } from "tools/colour/colour-tool";

type PaletteEntry = { id: number; name: string; value: string; };

const HARMONY_OPTIONS: Array<{ label: string; value: HarmonyMode; }> = [
    { label: "Complementary", value: "complementary" },
    { label: "Analogous", value: "analogous" },
    { label: "Triadic", value: "triadic" },
    { label: "Split-complementary", value: "split-complementary" },
    { label: "Tetradic", value: "tetradic" },
];

/**
 * Builds and edits a multi-colour palette, explores colour harmonies, and checks
 * pairwise WCAG contrast before exporting CSS custom properties.
 * @returns The interactive palette builder.
 */
// eslint-disable-next-line max-lines-per-function
export function ColourPaletteInput(): ReactNode {
    const [entries, setEntries] = useState<PaletteEntry[]>([
        { id: 1, name: "Primary", value: "#1C7EEA" },
        { id: 2, name: "Secondary", value: "#7B2CBF" },
        { id: 3, name: "Accent", value: "#E63946" },
    ]);
    const [nextId, setNextId] = useState(4);
    const [harmony, setHarmony] = useState<HarmonyMode>("complementary");
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const results = useMemo<ColourToolResult[]>(() => {
        try {
            return entries.map(({ value }) => runColourTool({ colour: normalisePaletteColour(value) }));
        } catch {
            return [];
        }
    }, [entries]);
    const contrastPairs = useMemo(() => getPaletteContrast(results), [results]);
    const valid = results.length === entries.length && entries.length > 0;

    const updateEntry = useCallback((id: number, field: "name" | "value", value: string): void => {
        setEntries((current) => current.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)));
        setCopied(false);
        setError(null);
    }, []);

    const addEntry = useCallback((): void => {
        if (entries.length >= MAX_PALETTE_COLOURS) {
            setError(`A palette can contain no more than ${MAX_PALETTE_COLOURS} colours.`);

            return;
        }

        setEntries((current) => [...current, { id: nextId, name: `Colour ${current.length + 1}`, value: "#336699" }]);
        setNextId((current) => current + 1);
        setError(null);
    }, [entries.length, nextId]);

    const duplicateEntry = useCallback((entry: PaletteEntry): void => {
        if (entries.length >= MAX_PALETTE_COLOURS) {
            setError(`A palette can contain no more than ${MAX_PALETTE_COLOURS} colours.`);

            return;
        }

        const index = entries.findIndex(({ id }) => id === entry.id);

        setEntries((current) => {
            const next = [...current];

            next.splice(index + 1, 0, { ...entry, id: nextId, name: `${entry.name} copy` });

            return next;
        });
        setNextId((current) => current + 1);
        setError(null);
    }, [entries, nextId]);

    const removeEntry = useCallback((id: number): void => {
        setEntries((current) => current.filter((entry) => entry.id !== id));
        setError(null);
    }, []);

    const moveEntry = useCallback((index: number, direction: -1 | 1): void => {
        setEntries((current) => {
            const destination = index + direction;

            if (destination < 0 || destination >= current.length)
                return current;

            const next = [...current];

            [next[index], next[destination]] = [next[destination]!, next[index]!];

            return next;
        });
    }, []);

    const applyHarmony = useCallback((): void => {
        try {
            const seed = normalisePaletteColour(entries[0]?.value ?? "");
            const colours = generateHarmonyPalette(seed, harmony);

            setEntries(colours.map((value, index) => ({
                id: index < entries.length ? entries[index]!.id : nextId + index - entries.length,
                name: index < entries.length ? entries[index]!.name : `Colour ${index + 1}`,
                value,
            })));
            setNextId((current) => current + Math.max(0, colours.length - entries.length));
            setError(null);
            setCopied(false);
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Unable to generate this harmony.");
        }
    }, [entries, harmony, nextId]);

    const copyCss = useCallback(async (): Promise<void> => {
        if (!valid) {
            setError("Correct or remove invalid colour values before exporting.");

            return;
        }

        try {
            await navigator.clipboard.writeText(createPaletteCssVariables(results, entries.map(({ name }) => name)));
            setCopied(true);
            setError(null);
        } catch {
            setError("Clipboard access failed. You can select and copy the CSS manually.");
        }
    }, [entries, results, valid]);

    const handleHarmonyChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setHarmony(event.target.value as HarmonyMode);
    }, []);

    const handleCopyCss = useCallback((): void => {
        void copyCss();
    }, [copyCss]);

    const applyHarmonyClick = useCallback((): void => {
        applyHarmony();
    }, [applyHarmony]);

    return (
        <ToolSection title="Build a palette">
            <Stack spacing={2}>
                <Typography color="text.secondary" variant="body2">
                    Edit, name, duplicate, remove, and reorder up to {MAX_PALETTE_COLOURS} colours. Use any supported
                    colour format, or generate a harmony from the first colour.
                </Typography>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                    <TextField
                        label="Harmony"
                        onChange={handleHarmonyChange}
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
                    <Button onClick={applyHarmonyClick} variant="outlined">Generate harmony from first colour</Button>
                    <Button disabled={entries.length >= MAX_PALETTE_COLOURS} onClick={addEntry} variant="contained">
                        Add colour
                    </Button>
                    <Button disabled={!valid} onClick={handleCopyCss}>{copied ? "CSS copied" : "Copy CSS"}</Button>
                </Stack>
                <Grid container spacing={1.5}>
                    {entries.map((entry, index) => {
                        let swatch = "#808080";

                        try {
                            swatch = normalisePaletteColour(entry.value);
                        } catch {
                            // Keep a neutral swatch while the user corrects an invalid value.
                        }

                        return (
                            <Grid key={entry.id} size={{ lg: 4, md: 6, xs: 12 }}>
                                <Card sx={{ height: "100%", overflow: "hidden" }}>
                                    <Card.Media style={{ backgroundColor: swatch, height: 96 }} />
                                    <Card.Content>
                                        <Stack spacing={1.5}>
                                            <TextField
                                                fullWidth
                                                label="Colour name"
                                                onChange={(event) => updateEntry(entry.id, "name", event.target.value)}
                                                size="small"
                                                value={entry.name}
                                            />
                                            <TextField
                                                fullWidth
                                                helperText="HEX, RGB, HSL, HSV, HWB, CMYK, or CSS name"
                                                label="Colour value"
                                                onChange={(event) => updateEntry(entry.id, "value", event.target.value)}
                                                size="small"
                                                value={entry.value}
                                            />
                                            {valid && results[index]
                                                ? (
                                                    <Typography color="text.secondary" variant="body2">
                                                        {results[index].hex} ·
                                                        Black {results[index].contrast.black.toFixed(2)}:1 ·
                                                        White {results[index].contrast.white.toFixed(2)}:1
                                                    </Typography>
                                                )
                                                : null}
                                            <Stack
                                                direction="row"
                                                spacing={0.5}
                                                sx={{ justifyContent: "space-between" }}
                                            >
                                                <Stack direction="row" spacing={0.5}>
                                                    {/* eslint-disable-next-line react/jsx-max-depth */}
                                                    <Button
                                                        disabled={index === 0}
                                                        onClick={() => moveEntry(index, -1)}
                                                        size="small"
                                                    >
                                                        Move up
                                                    </Button>
                                                    {/* eslint-disable-next-line react/jsx-max-depth */}
                                                    <Button
                                                        disabled={index === entries.length - 1}
                                                        onClick={() => moveEntry(index, 1)}
                                                        size="small"
                                                    >
                                                        Move down
                                                    </Button>
                                                </Stack>
                                                <Stack direction="row" spacing={0.5}>
                                                    {/* eslint-disable-next-line react/jsx-max-depth */}
                                                    <Button onClick={() => duplicateEntry(entry)} size="small">
                                                        Duplicate
                                                    </Button>
                                                    {/* eslint-disable-next-line react/jsx-max-depth */}
                                                    <Button
                                                        color="error"
                                                        disabled={entries.length === 1}
                                                        onClick={() => removeEntry(entry.id)}
                                                        size="small"
                                                    >
                                                        Remove
                                                    </Button>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Card.Content>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
                {error !== null && <Alert severity="error">{error}</Alert>}
                {valid
                    ? (
                        <>
                            <Box>
                                <Typography component="h3" gutterBottom variant="h6">Palette contrast</Typography>
                                <Typography color="text.secondary" gutterBottom variant="body2">
                                    Pairwise WCAG contrast ratios for the palette colours.
                                    AA requires 4.5:1 for normal text; AAA requires 7:1.
                                </Typography>
                                {contrastPairs.length === 0
                                    ? (
                                        <Typography color="text.secondary" variant="body2">
                                            Add a second colour to compare contrast between palette colours.
                                        </Typography>
                                    )
                                    : (
                                        <Grid container spacing={1}>
                                            {contrastPairs.map((pair) => (
                                                <Grid
                                                    key={`${pair.first}-${pair.second}`}
                                                    size={{ lg: 4, md: 6, xs: 12 }}
                                                >
                                                    <Card sx={{ height: "100%" }}>
                                                        <Card.Content>
                                                            <Stack
                                                                direction="row"
                                                                spacing={1}
                                                                sx={{ alignItems: "center" }}
                                                            >
                                                                <Box sx={{
                                                                    bgcolor: pair.first,
                                                                    border: 1,
                                                                    borderColor: "divider",
                                                                    borderRadius: 1,
                                                                    flexShrink: 0,
                                                                    height: 24,
                                                                    width: 24,
                                                                }}
                                                                />
                                                                <Typography variant="body2">
                                                                    {entries.find((entry) => results.find((result) => result.hex === pair.first)?.hex === pair.first && normalisePaletteColourSafe(entry.value) === pair.first)?.name ?? pair.first}
                                                                </Typography>
                                                                <Typography color="text.secondary" variant="body2">
                                                                    /
                                                                </Typography>
                                                                <Box sx={{
                                                                    bgcolor: pair.second,
                                                                    border: 1,
                                                                    borderColor: "divider",
                                                                    borderRadius: 1,
                                                                    flexShrink: 0,
                                                                    height: 24,
                                                                    width: 24,
                                                                }}
                                                                />
                                                                <Typography variant="body2">
                                                                    {entries.find((entry) => normalisePaletteColourSafe(entry.value) === pair.second)?.name ?? pair.second}
                                                                </Typography>
                                                            </Stack>
                                                            <Typography sx={{ mt: 1 }} variant="body2">
                                                                {pair.ratio.toFixed(2)}:1
                                                            </Typography>
                                                            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                                                                <Typography
                                                                    color={pair.meetsAA ? "success.main" : "error.main"}
                                                                    variant="caption"
                                                                >
                                                                    AA {pair.meetsAA ? "Pass" : "Fail"}
                                                                </Typography>
                                                                <Typography
                                                                    color={pair.meetsAAA ? "success.main" : "error.main"}
                                                                    variant="caption"
                                                                >
                                                                    AAA {pair.meetsAAA ? "Pass" : "Fail"}
                                                                </Typography>
                                                            </Stack>
                                                        </Card.Content>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    )}
                            </Box>
                            <Box>
                                <Typography component="h3" gutterBottom variant="h6">CSS custom properties</Typography>
                                <Code language="css">
                                    {createPaletteCssVariables(results, entries.map(({ name }) => name))}
                                </Code>
                            </Box>
                        </>
                    )
                    : null}
            </Stack>
        </ToolSection>
    );
}

/**
 * Normalises a palette colour value safely, returning an empty string if an error occurs.
 * @param value - The palette colour value to normalise.
 * @returns The normalised palette colour value, or an empty string if an error occurs.
 */
function normalisePaletteColourSafe(value: string): string {
    try {
        return normalisePaletteColour(value);
    } catch {
        return "";
    }
}
