"use client";

import { Alert, Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { type ChangeEvent, type ReactNode, useCallback, useState } from "react";
import { type ColourToolResult, colourToolResultSchema } from "tools/colour/colour-tool";
import { createPaletteCssVariables, MAX_PALETTE_COLOURS, parsePaletteInput } from "tools/colour/palette";
import { ToolSection } from "components/pages/tools/toolSection";
import { requestToolApi } from "tools/api";

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
        let normalised: string[];

        try {
            normalised = parsePaletteInput(input);
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Enter valid hexadecimal colours.");

            return;
        }

        setLoading(true);
        setError(null);
        setCopied(false);

        try {
            const loadResult = async (colour: string): Promise<ColourToolResult> => {
                const result = await requestToolApi(
                    "/api/tools/colour",
                    { colour },
                    colourToolResultSchema,
                );

                return result;
            };
            const next = await Promise.all(normalised.map(async (colour) => loadResult(colour)));

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
        analyse().catch((caught: unknown) => {
            setError(caught instanceof Error ? caught.message : "Unable to analyse this palette.");
        });
    }, [analyse]);

    const handleCopyCss = useCallback((): void => {
        copyCss().catch((caught: unknown) => {
            setError(caught instanceof Error ? caught.message : "Unable to copy CSS.");
        });
    }, [copyCss]);

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setInput(event.target.value);
    }, []);

    return (
        <ToolSection title="Build a palette">
            <Stack spacing={2}>
                <Typography color="text.secondary" variant="body2">
                    Paste up to {MAX_PALETTE_COLOURS} hexadecimal colours, separated by new lines, commas,
                    or semicolons. Each colour gets its own contrast analysis and set of related shades.
                </Typography>
                <TextField
                    fullWidth
                    label="Palette colours"
                    minRows={3}
                    multiline
                    onChange={handleInputChange}
                    placeholder={"#1C7EEA\n#7B2CBF\n#E63946"}
                    value={input}
                />
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                    <Button disabled={loading} onClick={handleAnalyse} variant="contained">
                        {loading ? "Analysing…" : "Analyse palette"}
                    </Button>
                    <Button disabled={loading || results.length === 0} onClick={handleCopyCss}>
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
                                        <Stack spacing={0.5} sx={{ p: 1.5 }}>
                                            <Typography sx={{ fontWeight: 600 }}>
                                                {`Colour ${index + 1}`}
                                            </Typography>
                                            <Typography variant="body2">{result.hex}</Typography>
                                            <Typography color="text.secondary" variant="body2">
                                                Black {result.contrast.black.toFixed(2)}:1 · White{" "}
                                                {result.contrast.white.toFixed(2)}:1
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
                            value={createPaletteCssVariables(results)}
                        />
                    </>
                )}
            </Stack>
        </ToolSection>
    );
}
