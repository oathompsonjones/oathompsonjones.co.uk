"use client";

import { Alert, Button, MenuItem, Stack, TextField } from "@mui/material";
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

type InputFormat = "hex" | "rgb" | "hsl" | "hsv" | "css";
const DEFAULT_COLOUR = "#1C7EEA";
const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

function hslToRgb(h: number, s: number, l: number): number[] {
    const saturation = clamp(s / 100, 0, 1);
    const lightness = clamp(l / 100, 0, 1);
    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const x = chroma * (1 - Math.abs(h / 60 % 2 - 1));
    const m = lightness - chroma / 2;
    const sector = ((h % 360) + 360) % 360;
    const channels = sector < 60 ? [chroma, x, 0]
        : sector < 120 ? [x, chroma, 0]
            : sector < 180 ? [0, chroma, x]
                : sector < 240 ? [0, x, chroma]
                    : sector < 300 ? [x, 0, chroma] : [chroma, 0, x];
    return channels.map((channel) => Math.round((channel + m) * 255));
}

function normaliseColour(input: string, format: InputFormat): string {
    const value = input.trim();
    const hex = (rgb: number[]): string =>
        `#${rgb.map((n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0")).join("")}`.toUpperCase();

    if (format === "hex") {
        if (!/^#?(?:[\da-f]{3}|[\da-f]{6})$/i.test(value))
            throw new Error("Enter a 3- or 6-digit hexadecimal colour.");
        const digits = value.replace(/^#/, "");
        return hex(digits.length === 3
            ? [...digits].map((d) => parseInt(d + d, 16))
            : [0, 2, 4].map((i) => parseInt(digits.slice(i, i + 2), 16)));
    }

    if (format === "rgb" || format === "hsl" || format === "hsv") {
        const match = /^(?:rgb|rgba|hsl|hsla|hsv)\(\s*([^)]*)\)$/i.exec(value);
        const parts = (match?.[1] ?? value).split(/[\s,/%]+/).filter(Boolean).map(Number);
        if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n)))
            throw new Error(`Enter three numeric components for ${format.toUpperCase()}.`);
        if (format === "rgb")
            return hex(parts);
        const [h, a, b] = parts;
        if (h === undefined || a === undefined || b === undefined)
            throw new Error("Enter three colour components.");
        if (format === "hsl")
            return hex(hslToRgb(h, a, b));

        const saturation = clamp(a / 100, 0, 1);
        const valueComponent = clamp(b / 100, 0, 1);
        const chroma = valueComponent * saturation;
        const x = chroma * (1 - Math.abs(h / 60 % 2 - 1));
        const m = valueComponent - chroma;
        const sector = ((h % 360) + 360) % 360;
        const channels = sector < 60 ? [chroma, x, 0]
            : sector < 120 ? [x, chroma, 0]
                : sector < 180 ? [0, chroma, x]
                    : sector < 240 ? [0, x, chroma]
                        : sector < 300 ? [x, 0, chroma] : [chroma, 0, x];
        return hex(channels.map((n) => (n + m) * 255));
    }

    if (!CSS.supports("color", value))
        throw new Error("Enter a valid CSS colour name or CSS colour value.");
    const probe = document.createElement("span");
    probe.style.color = value;
    document.body.append(probe);
    const computed = getComputedStyle(probe).color;
    probe.remove();
    const match = /^rgba?\(\s*(\d+)\D+(\d+)\D+(\d+)/i.exec(computed);
    if (match === null)
        throw new Error("This CSS colour cannot be converted to opaque sRGB.");
    return hex(match.slice(1).map(Number));
}

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
    const [colour, setColour] = useState(DEFAULT_COLOUR);
    const [format, setFormat] = useState<InputFormat>("hex");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const calculate = useCallback(async (input: string, inputFormat: InputFormat): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const normalised = normaliseColour(input, inputFormat);
            const next = await requestToolApi("/api/tools/colour", { colour: normalised }, resultSchema);
            setColour(next.hex);
            setFormat("hex");
            onResult(next);
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Unable to calculate this colour.");
        } finally {
            setLoading(false);
        }
    }, [onResult]);

    useEffect(() => {
        if (selectedColour !== null) {
            setColour(selectedColour);
            void calculate(selectedColour, "hex");
        }
    }, [selectedColour, calculate]);

    const updateColour = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setColour(event.target.value);
    }, []);

    const updatePicker = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value.toUpperCase();
        setColour(value);
        setFormat("hex");
        void calculate(value, "hex");
    }, [calculate]);

    const resetColour = useCallback((): void => {
        setColour(DEFAULT_COLOUR);
        setFormat("hex");
        void calculate(DEFAULT_COLOUR, "hex");
    }, [calculate]);

    const submit = useCallback((): void => {
        void calculate(colour, format);
    }, [calculate, colour, format]);

    const placeholder: Record<InputFormat, string> = {
        css: "cornflowerblue or rebeccapurple",
        hex: "#336699",
        hsl: "hsl(210, 50%, 40%)",
        hsv: "hsv(210, 67%, 60%)",
        rgb: "rgb(51, 102, 153)",
    };

    return (
        <Glass>
            <Stack direction={{ sm: "row", xs: "column" }} spacing={2} sx={{ alignItems: "center" }}>
                <TextField
                    fullWidth
                    label="Input format"
                    onChange={(event) => setFormat(event.target.value as InputFormat)}
                    select
                    value={format}
                >
                    <MenuItem value="hex">HEX</MenuItem>
                    <MenuItem value="rgb">RGB</MenuItem>
                    <MenuItem value="hsl">HSL</MenuItem>
                    <MenuItem value="hsv">HSV</MenuItem>
                    <MenuItem value="css">CSS colour (including named colours)</MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    label="Colour value"
                    onChange={updateColour}
                    onKeyDown={(event) => { if (event.key === "Enter") submit(); }}
                    placeholder={placeholder[format]}
                    value={colour}
                />
                <input
                    aria-label="Choose colour"
                    disabled={loading}
                    onChange={updatePicker}
                    type="color"
                    value={(/^#[\da-f]{6}$/i).test(colour) ? colour : DEFAULT_COLOUR}
                />
                <Button disabled={loading} onClick={submit}>Analyse</Button>
                <Button disabled={loading} onClick={resetColour} startIcon={<RestartAlt />}>Reset</Button>
            </Stack>
            {error !== null && <Alert severity="error">{error}</Alert>}
        </Glass>
    );
}
