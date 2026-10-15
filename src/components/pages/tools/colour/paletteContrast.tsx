import { Box, Grid, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { Card } from "components/card";
import type { PaletteEntry } from "components/pages/tools/colour/paletteColourCard";
import type { PaletteContrast } from "tools/colour/palette";
import { normalisePaletteColour } from "tools/colour/palette";

type PaletteContrastProps = {
    entries: PaletteEntry[];
    pairs: PaletteContrast[];
};

type PaletteContrastPairProps = {
    firstName: string;
    secondName: string;
    pair: PaletteContrast;
};

/** Shows the ratio and WCAG status for one pair of palette colours. */
function PaletteContrastPair({ firstName, secondName, pair }: PaletteContrastPairProps): ReactNode {
    return (
        <Card sx={{ height: "100%" }}>
            <Card.Content>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <Box sx={{
                        bgcolor: pair.first,
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 1,
                        flexShrink: 0,
                        height: 24,
                        width: 24,
                    }} />
                    <Typography variant="body2">{firstName}</Typography>
                    <Typography color="text.secondary" variant="body2">/</Typography>
                    <Box sx={{
                        bgcolor: pair.second,
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 1,
                        flexShrink: 0,
                        height: 24,
                        width: 24,
                    }} />
                    <Typography variant="body2">{secondName}</Typography>
                </Stack>
                <Typography sx={{ mt: 1 }} variant="body2">{pair.ratio.toFixed(2)}:1</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                    <Typography color={pair.meetsAA ? "success.main" : "error.main"} variant="caption">
                        AA {pair.meetsAA ? "Pass" : "Fail"}
                    </Typography>
                    <Typography color={pair.meetsAAA ? "success.main" : "error.main"} variant="caption">
                        AAA {pair.meetsAAA ? "Pass" : "Fail"}
                    </Typography>
                </Stack>
            </Card.Content>
        </Card>
    );
}

function getColourName(entries: PaletteEntry[], hex: string): string {
    const entry = entries.find((candidate) => {
        try {
            return normalisePaletteColour(candidate.value) === hex;
        } catch {
            return false;
        }
    });

    return entry?.name ?? hex;
}

/** Renders pairwise WCAG contrast results for the current palette. */
export function PaletteContrast({ entries, pairs }: PaletteContrastProps): ReactNode {
    return (
        <Box>
            <Typography component="h3" gutterBottom variant="h6">Palette contrast</Typography>
            <Typography color="text.secondary" gutterBottom variant="body2">
                Pairwise WCAG contrast ratios for the palette colours. AA requires 4.5:1 for normal text; AAA requires 7:1.
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
