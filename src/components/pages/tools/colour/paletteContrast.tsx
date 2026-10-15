import { Box, Grid, Typography } from "@mui/material";
import type { PaletteEntry } from "components/pages/tools/colour/paletteColourCard";
import { PaletteContrastPair } from "components/pages/tools/colour/paletteContrastPair";
import type { ReactNode } from "react";
import type { PaletteContrast as PaletteContrastResult } from "tools/colour/palette";
import { normalisePaletteColour } from "tools/colour/palette";

type PaletteContrastProps = Readonly<{
    entries: readonly PaletteEntry[];
    pairs: readonly PaletteContrastResult[];
}>;

/**
 * Finds the user-assigned name for a normalised colour value.
 * @param entries - The current palette entries.
 * @param hex - The normalised hexadecimal colour.
 * @returns The matching palette name, or the hexadecimal value if no name matches.
 */
function getColourName(entries: readonly PaletteEntry[], hex: string): string {
    const entry = entries.find((candidate) => {
        try {
            return normalisePaletteColour(candidate.value) === hex;
        } catch {
            return false;
        }
    });

    return entry?.name ?? hex;
}

/**
 * Renders the contrast results for each unique pair of palette colours.
 * @param root0 - The palette entries and their contrast pairs.
 * @param root0.entries - The palette entries.
 * @param root0.pairs - The calculated pairwise contrast results.
 * @returns A heading and the contrast result for each colour pair.
 */
export function PaletteContrast({ entries, pairs }: PaletteContrastProps): ReactNode {
    return (
        <Box>
            <Typography component="h3" gutterBottom variant="h6">Palette contrast</Typography>
            <Typography color="text.secondary" gutterBottom variant="body2">
                Pairwise WCAG contrast ratios. AA requires 4.5:1 for normal text; AAA requires 7:1.
            </Typography>
            {pairs.length === 0
                ? (
                    <Typography color="text.secondary" variant="body2">
                        Add a second colour to compare contrast between palette colours.
                    </Typography>
                )
                : (
                    <Grid container spacing={1}>
                        {pairs.map((pair) => (
                            <Grid key={`${pair.first}-${pair.second}`} size={{ lg: 4, md: 6, xs: 12 }}>
                                <PaletteContrastPair
                                    firstName={getColourName(entries, pair.first)}
                                    pair={pair}
                                    secondName={getColourName(entries, pair.second)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
        </Box>
    );
}
