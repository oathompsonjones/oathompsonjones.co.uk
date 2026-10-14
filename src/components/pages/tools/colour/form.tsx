"use client";

import { ContentCopy, RestartAlt } from "@mui/icons-material";
import { Alert, Button, Chip, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type { ReactNode } from "react";
import { ToolSection } from "components/pages/tools/toolSection";
import { requestToolApi } from "tools/api";
import { z } from "zod";

const resultSchema = z.object({
    colour: z.string(),
    contrast: z.object({
        black: z.number(),
        blackMeetsAA: z.boolean(),
        blackMeetsAALarge: z.boolean(),
        recommended: z.enum(["black", "white"]),
        white: z.number(),
        whiteMeetsAA: z.boolean(),
        whiteMeetsAALarge: z.boolean(),
    }),
    hex: z.string(),
    hsl: z.object({ h: z.number(), l: z.number(), s: z.number() }),
    luminance: z.number(),
    palette: z.array(z.object({ hex: z.string(), label: z.string() })),
    rgb: z.object({ b: z.number(), g: z.number(), r: z.number() }),
});

type ColourResult = z.infer<typeof resultSchema>;

const ratio = (value: number): string => `${value.toFixed(2)}:1`;

/** Interactive UI for colour relationships and WCAG contrast checks. */
export function ColourToolForm(): ReactNode {
    const [colour, setColour] = useState("#336699");
    const [result, setResult] = useState<ColourResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);

    async function calculate(value = colour): Promise<void> {
        setLoading(true);
        setError(null);

        try {
            const next = await requestToolApi("/api/tools/colour", { colour: value }, resultSchema);
            setResult(next);
            setColour(next.hex);
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Unable to calculate this colour.");
        } finally {
            setLoading(false);
        }
    }

    async function copy(value: string): Promise<void> {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(value);
        } catch {
            setError("Clipboard access failed. You can select and copy the value manually.");
        }
    }

    return (
        <Stack spacing={3}>
            <ToolSection title="Choose a colour">
                <Stack direction={{ sm: "row", xs: "column" }} spacing={2} alignItems={{ sm: "flex-start" }}>
                    <TextField
                        fullWidth
                        label="Hex colour"
                        helperText="Enter a 3- or 6-digit hex colour, with or without #."
                        onChange={(event) => setColour(event.target.value)}
                        value={colour}
                    />
                    <Button
                        disabled={loading}
                        onClick={() => void calculate()}
                        sx={{ minHeight: 56, minWidth: 140 }}
                        variant="contained"
                    >
                        {loading ? "Calculating…" : "Generate"}
                    </Button>
                    <Button
                        aria-label="Reset colour"
                        disabled={loading}
                        onClick={() => {
                            setColour("#336699");
                            void calculate("#336699");
                        }}
                        startIcon={<RestartAlt />}
                        sx={{ minHeight: 56 }}
                    >
                        Reset
                    </Button>
                </Stack>
                {error !== null && <Alert severity="error">{error}</Alert>}
            </ToolSection>

            {result !== null && <>
                <ToolSection title="Colour details">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Paper aria-label={result.hex} sx={{ backgroundColor: result.hex, border: 1, borderColor: "divider", height: 72, width: 72 }} />
                        <Stack spacing={0.5} sx={{ minWidth: 0 }}>
                            <Typography variant="h5">{result.hex}</Typography>
                            <Typography color="text.secondary" variant="body2">
                                RGB({result.rgb.r}, {result.rgb.g}, {result.rgb.b}) · HSL({result.hsl.h.toFixed(1)}°, {result.hsl.s.toFixed(1)}%, {result.hsl.l.toFixed(1)}%)
                            </Typography>
                            <Button
                                onClick={() => void copy(result.hex)}
                                size="small"
                                startIcon={<ContentCopy />}
                                sx={{ alignSelf: "flex-start" }}
                            >
                                {copied === result.hex ? "Copied" : "Copy hex"}
                            </Button>
                        </Stack>
                    </Stack>
                </ToolSection>

                <ToolSection title="Black or white text?">
                    <Grid container spacing={2}>
                        {(["black", "white"] as const).map((foreground) => {
                            const contrast = result.contrast[foreground];
                            const passesAA = result.contrast[`${foreground}MeetsAA` as "blackMeetsAA" | "whiteMeetsAA"];
                            const passesLarge = result.contrast[`${foreground}MeetsAALarge` as "blackMeetsAALarge" | "whiteMeetsAALarge"];

                            return (
                                <Grid key={foreground} size={{ md: 6, xs: 12 }}>
                                    <Paper
                                        sx={{
                                            backgroundColor: result.hex,
                                            border: 2,
                                            borderColor: result.contrast.recommended === foreground ? "primary.main" : "divider",
                                            color: foreground,
                                            p: 2,
                                        }}
                                    >
                                        <Typography variant="h6">{foreground === "black" ? "Black text" : "White text"}</Typography>
                                        <Typography variant="h4">{ratio(contrast)}</Typography>
                                        <Typography variant="body2">Contrast ratio on {result.hex}</Typography>
                                        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
                                            {result.contrast.recommended === foreground && <Chip color="primary" label="Recommended" size="small" />}
                                            <Chip color={passesAA ? "success" : "default"} label={passesAA ? "AA normal text" : "Fails AA normal"} size="small" />
                                            <Chip color={passesLarge ? "success" : "default"} label={passesLarge ? "AA large text" : "Fails AA large"} size="small" />
                                        </Stack>
                                    </Paper>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Typography color="text.secondary" variant="body2">
                        WCAG AA requires 4.5:1 for normal text and 3:1 for large text (at least 18 pt regular or 14 pt bold).
                    </Typography>
                </ToolSection>

                <ToolSection title="Generated palette">
                    <Grid container spacing={1.5}>
                        {result.palette.map(({ hex, label }) => (
                            <Grid key={label} size={{ lg: 3, sm: 4, xs: 6 }}>
                                <Paper sx={{ overflow: "hidden" }}>
                                    <div aria-label={`${label}: ${hex}`} style={{ backgroundColor: hex, height: 88 }} />
                                    <Stack spacing={0.5} sx={{ p: 1.5 }}>
                                        <Typography variant="body2">{label}</Typography>
                                        <Typography fontFamily="monospace" variant="body2">{hex}</Typography>
                                        <Button
                                            onClick={() => {
                                                setColour(hex);
                                                void calculate(hex);
                                            }}
                                            size="small"
                                        >
                                            Use colour
                                        </Button>
                                        <Button onClick={() => void copy(hex)} size="small" startIcon={<ContentCopy />}>
                                            {copied === hex ? "Copied" : "Copy"}
                                        </Button>
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </ToolSection>
            </>}
        </Stack>
    );
}
