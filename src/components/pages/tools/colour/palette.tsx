"use client";

import { Alert, Grid, Stack, Typography } from "@mui/material";
import { PaletteColourCard, type PaletteEntry } from "components/pages/tools/colour/paletteColourCard";
import { PaletteContrast } from "components/pages/tools/colour/paletteContrast";
import { PaletteControls } from "components/pages/tools/colour/paletteControls";
import { PaletteCssExport } from "components/pages/tools/colour/paletteCssExport";
import { ToolSection } from "components/pages/tools/toolSection";
import { usePaletteBuilder } from "components/pages/tools/colour/usePaletteBuilder";
import type { ReactNode } from "react";
import { MAX_PALETTE_COLOURS } from "tools/colour/palette";

/**
 * Builds and edits a multi-colour palette, explores colour harmonies, and checks
 * pairwise WCAG contrast before exporting CSS custom properties.
 * @returns The interactive palette builder.
 */
export function ColourPaletteInput(): ReactNode {
    const {
        addEntry,
        copied,
        contrastPairs,
        duplicateEntry,
        entries,
        error,
        handleCopyCss,
        handleGenerateHarmony,
        handleHarmonyChange,
        harmony,
        moveEntry,
        removeEntry,
        updateEntry,
        results,
        valid,
    } = usePaletteBuilder();

    return (
        <ToolSection title="Build a palette">
            <Stack spacing={2}>
                <Typography color="text.secondary" variant="body2">
                    Edit, name, duplicate, remove, and reorder up to {MAX_PALETTE_COLOURS} colours. Use any supported
                    colour format, or generate a harmony from the first colour.
                </Typography>
                <PaletteControls
                    copied={copied}
                    colourCount={entries.length}
                    harmony={harmony}
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
                {valid && (
                    <Stack spacing={3}>
                        <PaletteContrast entries={entries} pairs={contrastPairs} />
                        <Stack spacing={1}>
                            <Typography component="h3" variant="h6">CSS custom properties</Typography>
                            <PaletteCssExport entries={entries} results={results} />
                        </Stack>
                    </Stack>
                )}
            </Stack>
        </ToolSection>
    );
}
