"use client";

import { Alert, Button, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import type { MouseEvent, ReactNode } from "react";
import { useCallback, useState } from "react";
import { Card } from "components/card";
import type { ColourToolResult } from "tools/colour-tool";
import { ToolSection } from "components/pages/tools/toolSection";

const ratio = (value: number): string => `${value.toFixed(2)}:1`;

function colourFormats(result: ColourToolResult): Array<{ label: string; value: string }> {
    const { b, g, r } = result.rgb;
    const { h, l, s } = result.hsl;
    const red = r / 255, green = g / 255, blue = b / 255;
    const max = Math.max(red, green, blue), min = Math.min(red, green, blue);
    const delta = max - min;
    const hue = delta === 0 ? 0 : max === red ? 60 * ((green - blue) / delta % 6)
        : max === green ? 60 * ((blue - red) / delta + 2) : 60 * ((red - green) / delta + 4);
    const hsvS = max === 0 ? 0 : delta / max * 100;
    const whiteness = min * 100;
    const blackness = (1 - max) * 100;
    const k = 1 - max;
    const cmyk = max === 0 ? [0, 0, 0, 100]
        : [(1 - red - k) / (1 - k) * 100, (1 - green - k) / (1 - k) * 100,
            (1 - blue - k) / (1 - k) * 100, k * 100];

    return [
        { label: "HEX", value: result.hex },
        { label: "RGB", value: `rgb(${r}, ${g}, ${b})` },
        { label: "HSL", value: `hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)` },
        { label: "HSV", value: `hsv(${((hue + 360) % 360).toFixed(1)}, ${hsvS.toFixed(1)}%, ${(max * 100).toFixed(1)}%)` },
        { label: "HWB", value: `hwb(${((hue + 360) % 360).toFixed(1)} ${whiteness.toFixed(1)}% ${blackness.toFixed(1)}%)` },
        { label: "CMYK", value: `cmyk(${cmyk.map((n) => n.toFixed(1) + "%").join(", ")})` },
        { label: "CSS", value: `rgb(${r} ${g} ${b})` },
    ];
}

/**
 * Displays colour measurements, contrast guidance, and generated palette swatches.
 * @param props - The analysis result and a callback for selecting a palette colour.
 * @param props.result - The colour analysis result.
 * @param props.onSelectColour - Callback for selecting a palette colour.
 * @returns The colour analysis results.
 */
export function ColourToolResults({ result, onSelectColour }: {
    readonly result: ColourToolResult;
    readonly onSelectColour: (colour: string) => void;
}): ReactNode {
    const [copied, setCopied] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const copy = useCallback(async (value: string): Promise<void> => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(value);
            setError(null);
        } catch {
            setError("Clipboard access failed. You can select and copy the value manually.");
        }
    }, []);

    const handleCopy = useCallback((event: MouseEvent<HTMLButtonElement>): void => {
        const value = event.currentTarget.dataset.copyValue;
        if (value !== undefined)
            void copy(value);
    }, [copy]);

    const handleSelectColour = useCallback((event: MouseEvent<HTMLButtonElement>): void => {
        const { colour } = event.currentTarget.dataset;
        if (colour !== undefined)
            onSelectColour(colour);
    }, [onSelectColour]);

    return (
        <Stack spacing={3}>
            {error !== null && <Alert severity="error">{error}</Alert>}
            <ToolSection title="Colour details">
                <Grid container spacing={1.5}>
                    <Grid size={{ sm: 2, xs: 12 }}>
                        <Paper sx={{ backgroundColor: result.hex, border: 1, borderColor: "divider", height: 72 }} />
                    </Grid>
                    {colourFormats(result).map(({ label, value }) => (
                        <Grid key={label} size={{ md: 4, sm: 6, xs: 12 }}>
                            <Button
                                aria-label={`Copy ${label} value ${value}`}
                                data-copy-value={value}
                                fullWidth
                                onClick={handleCopy}
                                sx={{ alignItems: "flex-start", flexDirection: "column", textAlign: "left", textTransform: "none" }}
                                variant="outlined"
                            >
                                <Typography variant="overline">{label}</Typography>
                                <Typography sx={{ overflowWrap: "anywhere" }} variant="body2">
                                    {copied === value ? "Copied" : value}
                                </Typography>
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </ToolSection>

            <ToolSection title="Black or white text?">
                <Grid container spacing={2}>
                    {(["black", "white"] as const).map((foreground) => {
                        const contrast = result.contrast[foreground];
                        const passesAA = result.contrast[`${foreground}MeetsAA`];
                        const passesLarge = result.contrast[`${foreground}MeetsAALarge`];
                        return (
                            <Grid key={foreground} size={{ md: 6, xs: 12 }}>
                                <Paper sx={{
                                    backgroundColor: result.hex,
                                    border: 2,
                                    borderColor: result.contrast.recommended === foreground ? "primary.main" : "divider",
                                    color: foreground,
                                    p: 2,
                                }}>
                                    <Typography variant="h6">{foreground === "black" ? "Black text" : "White text"}</Typography>
                                    <Typography variant="h4">{ratio(contrast)}</Typography>
                                    <Typography variant="body2">Contrast ratio on {result.hex}</Typography>
                                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mt: 1 }}>
                                        {result.contrast.recommended === foreground &&
                                            <Chip color="primary" label="Recommended" size="small" />}
                                        <Chip color={passesAA ? "success" : "default"}
                                            label={passesAA ? "AA normal text" : "Fails AA normal"} size="small" />
                                        <Chip color={passesLarge ? "success" : "default"}
                                            label={passesLarge ? "AA large text" : "Fails AA large"} size="small" />
                                    </Stack>
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
                <Typography color="text.secondary" variant="body2">
                    WCAG AA requires 4.5:1 for normal text and 3:1 for large text
                    (at least 18 pt regular or 14 pt bold).
                </Typography>
            </ToolSection>

            <ToolSection glass={false}>
                <Grid container spacing={1.5}>
                    {result.palette.map(({ hex, label }) => (
                        <Grid key={label} size={{ lg: 3, sm: 4, xs: 6 }}>
                            <Card sx={{ overflow: "hidden" }}>
                                <Card.Media style={{ backgroundColor: hex, height: 150 }} />
                                <Card.Header subheader={hex} title={label} />
                                <Card.Actions>
                                    <Button data-colour={hex} onClick={handleSelectColour} size="small" sx={{ width: "100%" }}>
                                        Select
                                    </Button>
                                    <Button data-copy-value={hex} onClick={handleCopy} size="small"
                                        sx={{ width: "100%" }}>
                                        {copied === hex ? "Copied" : "Copy"}
                                    </Button>
                                </Card.Actions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </ToolSection>
        </Stack>
    );
}
