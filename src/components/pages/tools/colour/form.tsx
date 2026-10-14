"use client";

import { Alert, Button, Stack, TextField } from "@mui/material";
import type { ChangeEvent, ReactNode } from "react";
import { RestartAlt } from "@mui/icons-material";
import { useCallback, useState } from "react";
import { requestToolApi } from "tools/api";
import { z } from "zod";
import type { ColourToolResult } from "tools/colour-tool";

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

/**
 * Input controls for choosing a colour and requesting its analysis.
 * @param props - The result callback.
 * @returns The colour input form.
 */
export function ColourToolForm({ onResult }: { onResult: (result: ColourToolResult) => void }): ReactNode {
    const [colour, setColour] = useState("#336699");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function calculate(value = colour): Promise<void> {
        setLoading(true);
        setError(null);

        try {
            const next = await requestToolApi("/api/tools/colour", { colour: value }, resultSchema);
            setColour(next.hex);
            onResult(next);
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Unable to calculate this colour.");
        } finally {
            setLoading(false);
        }
    }

    const updateColour = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setColour(event.target.value);
    }, []);

    const updatePicker = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setColour(event.target.value.toUpperCase());
        void calculate(event.target.value);
    }, []);

    return (
        <Stack spacing={2}>
            <Stack direction={{ sm: "row", xs: "column" }} spacing={2} alignItems="center">
                <TextField
                    fullWidth
                    helperText="Enter a 3- or 6-digit hex colour, with or without #."
                    label="Hex colour"
                    onChange={updateColour}
                    value={colour}
                />
                <Stack direction="row" spacing={1} alignItems="center">
                    <label htmlFor="colour-picker">Choose colour</label>
                    <input
                        aria-label="Choose colour"
                        disabled={loading}
                        id="colour-picker"
                        onChange={updatePicker}
                        type="color"
                        value={/^#[\\da-f]{6}$/i.test(colour) ? colour : "#336699"}
                    />
                </Stack>
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
        </Stack>
    );
}
