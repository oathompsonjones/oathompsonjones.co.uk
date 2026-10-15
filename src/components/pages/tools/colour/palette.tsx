"use client";

import { Alert, Grid, Stack, Typography } from "@mui/material";
import type { ChangeEvent, ReactNode } from "react";
import { useCallback, useMemo, useState } from "react";
import { PaletteColourCard, type PaletteEntry } from "components/pages/tools/colour/paletteColourCard";
import { PaletteContrast } from "components/pages/tools/colour/paletteContrast";
import { PaletteControls } from "components/pages/tools/colour/paletteControls";
import { PaletteCssExport } from "components/pages/tools/colour/paletteCssExport";
import { ToolSection } from "components/pages/tools/toolSection";
import { runColourTool, type ColourToolResult } from "tools/colour/colour-tool";
import {
    MAX_PALETTE_COLOURS,
    createPaletteCssVariables,
    generateHarmonyPalette,
    getPaletteContrast,
    normalisePaletteColour,
    type HarmonyMode,
} from "tools/colour/palette";

/**
 * Builds and edits a multi-colour palette, explores colour harmonies, and checks
 * pairwise WCAG contrast before exporting CSS custom properties.
 * @returns The interactive palette builder.
 */
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

        setEntries((current) => [...current, {
            id: nextId,
            name: `Colour ${current.length + 1}`,
            value: "#336699",
        }]);
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
            await navigator.clipboard.writeText(createPaletteCssVariables(
                results,
                entries.map(({ name }) => name),
            ));
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

    const handleGenerateHarmony = useCallback((): void => {
        applyHarmony();
    }, [applyHarmony]);

    return (
        <ToolSection title="Build a palette">
            <Stack spacing={2}>
                <Typography color="text.secondary" variant="body2">
                    Edit, name, duplicate, remove, and reorder up to {MAX_PALETTE_COLOURS} colours. Use any supported
                    colour format, or generate a harmony from the first colour.
                </Typography>
                <PaletteControls
                    copied={copied}
                    harmony={harmony}
                    colourCount={entries.length}
                    maxColours={MAX_PALETTE_COLOURS}
                    onAddColour={addEntry}
                    onCopyCss={handleCopyCss}
                    onGenerateHarmony={handleGenerateHarmony}
                    onHarmonyChange={handleHarmonyChange}
                    valid={valid}
                />
                <Grid container spacing={1.5}>
                    {entries.map((entry, index) => (
                        <Grid key={entry.id} size={{ lg: 4, md: 6, xs: 12 }}>
                            <PaletteColourCard
                                entry={entry}
                                index={index}
                                onDuplicate={duplicateEntry}
                                onMove={moveEntry}
                                onRemove={removeEntry}
                                onUpdate={updateEntry}
                                result={valid ? results[index] : undefined}
                                total={entries.length}
                            />
                        </Grid>
                    ))}
                </Grid>
                {error !== null ? <Alert severity="error">{error}</Alert> : null}
                {valid
                    ? (
                        <Stack spacing={3}>
                            <PaletteContrast entries={entries} pairs={contrastPairs} />
                            <Stack spacing={1}>
                                <Typography component="h3" variant="h6">CSS custom properties</Typography>
                                <PaletteCssExport entries={entries} results={results} />
                            </Stack>
                        </Stack>
                    )
                    : null}
            </Stack>
        </ToolSection>
    );
}
