"use client";

import { Alert, Button, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import type { MouseEvent, ReactNode } from "react";
import { useCallback, useState } from "react";
import { Card } from "components/card";
import type { ColourToolResult } from "tools/colour/colour-tool";
import { ToolSection } from "components/pages/tools/toolSection";
import { colourFormats } from "tools/colour/colour-tool";

const ratio = (value: number): string => `${value.toFixed(2)}:1`;

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
                <Paper sx={{ backgroundColor: result.hex, border: 1, borderColor: "divider", height: 72 }} />
                <Grid container spacing={2}>
                    {colourFormats(result).map(({ label, value }) => (
                        <Grid key={label} size={{ md: 4, sm: 6, xs: 12 }}>
                            <Button
                                data-copy-value={value}
                                fullWidth
                                onClick={handleCopy}
                                variant="text"
                            >
                                {value}
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
                                    borderColor: result.contrast.recommended === foreground
                                        ? "primary.main"
                                        : "divider",
                                    color: foreground,
                                    p: 2,
                                }}
                                >
                                    <Typography variant="h6">
                                        {foreground === "black" ? "Black text" : "White text"}
                                    </Typography>
                                    <Typography variant="h4">{ratio(contrast)}</Typography>
                                    <Typography variant="body2">Contrast ratio on {result.hex}</Typography>
                                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mt: 1 }}>
                                        {result.contrast.recommended === foreground &&
                                        <Chip color="primary" label="Recommended" size="small" />}
                                        <Chip
                                            color={passesAA ? "success" : "default"}
                                            label={passesAA ? "AA normal text" : "Fails AA normal"} size="small"
                                        />
                                        <Chip
                                            color={passesLarge ? "success" : "default"}
                                            label={passesLarge ? "AA large text" : "Fails AA large"} size="small"
                                        />
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
                                    <Button
                                        data-colour={hex}
                                        onClick={handleSelectColour}
                                        size="small"
                                        sx={{ width: "100%" }}
                                    >
                                        Select
                                    </Button>
                                    <Button
                                        data-copy-value={hex}
                                        onClick={handleCopy}
                                        size="small"
                                        sx={{ width: "100%" }}
                                    >
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
