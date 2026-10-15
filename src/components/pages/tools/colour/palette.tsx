"use client";

import { Alert, Box, Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { type ChangeEvent, type ReactNode, useCallback, useState } from "react";
import { type ColourToolResult, colourToolResultSchema } from "tools/colour/colour-tool";
import { MAX_PALETTE_COLOURS, createPaletteCssVariables, parsePaletteInput } from "tools/colour/palette";
import { Card } from "components/card";
import { ToolSection } from "components/pages/tools/toolSection";
import { requestToolApi } from "tools/api";

/**
 * Builds a multi-colour palette and exports its colour variables as CSS.
 * @returns The palette input, swatches, and CSS export.
 */
export function ColourPaletteInput(): ReactNode {
    const [input, setInput] = useState("#1C7EEA\n#7B2CBF\n#E63946");
    const [results, setResults] = useState<ColourToolResult[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const analyse = useCallback(async (): Promise<void> => {
        let colours: string[];

        try {
            colours = parsePaletteInput(input);
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Enter valid colour values.");

            return;
        }

        setLoading(true);
        setError(null);
        setCopied(false);

        try {
            const next = await Promise.all(colours.map(async (colour) => requestToolApi(
                "/api/tools/colour", { colour }, colourToolResultSchema,
            )));

            setResults(next);
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Unable to analyse this palette.");
        } finally {
            setLoading(false);
        }
    }, [input]);

    const copyCss = useCallback(async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(createPaletteCssVariables(results));
            setCopied(true);
            setError(null);
        } catch {
            setError("Clipboard access failed. You can select and copy the CSS manually.");
        }
    }, [results]);

    const handleAnalyse = useCallback((): void => {
        void analyse();
    }, [analyse]);

    const handleCopyCss = useCallback((): void => {
        void copyCss();
    }, [copyCss]);

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setInput(event.target.value);
    }, []);

    return (
        <ToolSection title="Build a palette">
            <Stack spacing={2}>
                <Typography color="text.secondary" variant="body2">
                    Enter up to {MAX_PALETTE_COLOURS} colours, one per line. HEX, RGB, HSL, HSV, HWB,
                    CMYK, and CSS named colours are supported.
                </Typography>
                <TextField
                    fullWidth
                    helperText="Examples: #1C7EEA, rgb(28, 126, 234), hsl(211, 83%, 51%), cornflowerblue"
                    label="Colour values"
                    minRows={3}
                    multiline
                    onChange={handleInputChange}
                    placeholder={"#1C7EEA\nrgb(123, 44, 191)\ncornflowerblue"}
                    value={input}
                />
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                    <Button disabled={loading} onClick={handleAnalyse} variant="contained">
                        {loading ? "Analysing…" : "Generate palette"}
                    </Button>
                    <Button disabled={loading || results.length === 0} onClick={handleCopyCss}>
                        {copied ? "CSS copied" : "Copy CSS"}
                    </Button>
                </Stack>
                {error !== null && <Alert severity="error">{error}</Alert>}
                {results.length > 0 && (
                    <>
                        <Grid container spacing={1.5}>
                            {results.map((result, index) => (
                                <Grid key={result.hex + index} size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                                    <Card sx={{ height: "100%", overflow: "hidden" }}>
                                        <Card.Media style={{ backgroundColor: result.hex, height: 120 }} />
                                        <Card.Header
                                            subheader={result.hex}
                                            title={`Colour ${index + 1}`}
                                        />
                                        <Card.Content>
                                            <Typography color="text.secondary" variant="body2">
                                                Black {result.contrast.black.toFixed(2)}:1 · White{" "}
                                                {result.contrast.white.toFixed(2)}:1
                                            </Typography>
                                        </Card.Content>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Box>
                            <Typography component="h3" gutterBottom variant="h6">CSS custom properties</Typography>
                            <Paper
                                component="pre"
                                sx={{
                                    fontFamily: "monospace",
                                    fontSize: "0.875rem",
                                    height: "auto",
                                    lineHeight: 1.6,
                                    m: 0,
                                    maxHeight: 420,
                                    overflow: "auto",
                                    p: 2,
                                    whiteSpace: "pre",
                                }}
                            >
                                <code>{createPaletteCssVariables(results)}</code>
                            </Paper>
                        </Box>
                    </>
                )}
            </Stack>
        </ToolSection>
    );
}
