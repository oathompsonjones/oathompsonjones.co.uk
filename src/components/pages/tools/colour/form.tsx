"use client";

import { Alert, Button, Stack, TextField } from "@mui/material";
import type { ChangeEvent, ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import type { ColourToolResult } from "tools/colour-tool";
import { Glass } from "components/glass";
import { RestartAlt } from "@mui/icons-material";
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

/**
 * Input controls for choosing a colour and requesting its analysis.
 * @param props - The selected palette colour and result callback.
 * @param props.selectedColour - The currently selected colour from the palette.
 * @param props.onResult - Callback invoked with the analysis result when available.
 * @returns The colour input form.
 */
export function ColourToolForm({ selectedColour, onResult }: Readonly<{
    selectedColour: string | null;
    onResult: (result: ColourToolResult) => void;
}>): ReactNode {
    const defaultColour = "#1C7EEA";
    const [colour, setColour] = useState(defaultColour);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    /**
     * Calculates the colour analysis for the given value.
     * @param value - The colour value to calculate the analysis for. If not provided, the current colour state is used.
     */
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

    const updateColour = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setColour(event.target.value);
    }, []);

    const updatePicker = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value.toUpperCase();

        setColour(value);
        void calculate(value);
    }, [calculate]);

    const resetColour = useCallback((): void => {
        setColour(defaultColour);
        void calculate(defaultColour);
    }, [calculate]);

    useEffect(() => {
        if (selectedColour !== null)
            setColour(selectedColour);

        void calculate(selectedColour ?? defaultColour);
    }, [selectedColour]);

    return (
        <Glass>
            <Stack direction={{ sm: "row", xs: "column" }} spacing={2} sx={{ alignItems: "center" }}>
                <TextField fullWidth label="Hex colour" onChange={updateColour} value={colour} />
                <input
                    disabled={loading}
                    id="colour-picker"
                    onChange={updatePicker}
                    type="color"
                    value={(/^#[\da-f]{6}$/i).test(colour) ? colour : defaultColour}
                />
                <Button disabled={loading} onClick={resetColour} startIcon={<RestartAlt />}>Reset</Button>
            </Stack>
            {error !== null && <Alert severity="error">{error}</Alert>}
        </Glass>
    );
}
