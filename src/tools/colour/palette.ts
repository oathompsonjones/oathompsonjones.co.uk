/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/sort-type-constituents, @typescript-eslint/strict-boolean-expressions, jsdoc/require-param, jsdoc/require-returns, jsdoc/require-throws, max-len, newline-after-var, newline-before-return, newline-per-chained-call, sort-imports, sort-keys, @stylistic/member-delimiter-style, @stylistic/padding-line-between-statements */
import { contrastRatio, hslToRgb, parseHexColour, rgbToHex, rgbToHsl, type ColourToolResult, type InputFormat, normaliseColour, runColourTool } from "./colour-tool";

export const MAX_PALETTE_COLOURS = 12;

const PALETTE_LABELS = [
    "primary",
    "secondary",
    "tertiary",
    "quaternary",
    "quinary",
    "senary",
    "septenary",
    "octonary",
    "nonary",
    "denary",
    "eleventh",
    "twelfth",
] as const;

const VARIATION_NAMES: ReadonlyArray<readonly [string, string]> = [
    ["Analogous +30°", "analogous-plus-30"],
    ["Analogous -30°", "analogous-minus-30"],
    ["Base", "base"],
    ["Complementary", "complementary"],
    ["Dark", "dark"],
    ["Light", "light"],
    ["Shade", "shade"],
    ["Tint", "tint"],
];

/**
 * Parses a single CSS colour value and normalises it to six-digit HEX.
 * @param input - A HEX, RGB, HSL, HSV, HWB, CMYK, or CSS named colour.
 * @returns The normalised six-digit HEX colour.
 * @throws If the value is not a supported valid colour.
 */
export function normalisePaletteColour(input: string): string {
    const value = input.trim();

    if (value === "")
        throw new Error("Enter a colour value.");

    if ((/^#?[\da-f]{3}(?:[\da-f]{3})?$/i).test(value))
        return normaliseColour(value, "hex");

    let format: InputFormat;

    if ((/^rgb\(/i).test(value))
        format = "rgb";
    else if ((/^hsl\(/i).test(value))
        format = "hsl";
    else if ((/^hsv\(/i).test(value))
        format = "hsv";
    else if ((/^hwb\(/i).test(value))
        format = "hwb";
    else if ((/^cmyk\(/i).test(value))
        format = "cmyk";
    else
        format = "css";

    return normaliseColour(value, format);
}

/**
 * Parses and normalises a list of colour values for palette analysis.
 * @param input - Colours separated by newlines, commas, or semicolons.
 * @returns Normalised six-digit HEX colours.
 * @throws If the input is empty, too long, or contains invalid colours.
 */
export function parsePaletteInput(input: string): string[] {
    const values: string[] = [];
    let current = "";
    let depth = 0;

    for (const character of input) {
        if (character === "(")
            depth++;
        else if (character === ")")
            depth = Math.max(0, depth - 1);

        if (character === "," && depth === 0 || character === "\n" || character === ";") {
            values.push(current);
            current = "";
        } else {
            current += character;
        }
    }

    values.push(current);

    const colours = values.map((colour) => colour.trim())
        .filter(Boolean);

    if (colours.length === 0)
        throw new Error("Enter at least one colour.");

    if (colours.length > MAX_PALETTE_COLOURS)
        throw new Error(`Enter no more than ${MAX_PALETTE_COLOURS} colours at a time.`);

    return colours.map((colour) => {
        try {
            return normalisePaletteColour(colour);
        } catch {
            throw new Error(`Invalid colour: ${colour}. Use HEX, RGB, HSL, HSV, HWB, CMYK, or a CSS named colour.`);
        }
    });
}

/**
 * Converts a variation label to its CSS custom-property suffix.
 * @param label - The generated variation label.
 * @returns A kebab-case suffix for the CSS variable.
 */
function variationName(label: string): string {
    return VARIATION_NAMES.find(([name]) => name === label)?.[1] ??
        label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

/**
 * Serialises analysed palette colours and their variants as CSS custom properties.
 * @param results - The analysed colours.
 * @returns A CSS :root block containing the variables.
 */
export function createPaletteCssVariables(results: readonly ColourToolResult[], names?: readonly string[]): string {
    const lines = [":root {"];

    results.forEach((result, index) => {
        const suppliedName = names?.[index]?.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        const name = suppliedName || PALETTE_LABELS[index] || `colour-${index + 1}`;

        result.palette.forEach(({ hex, label }) => {
            lines.push(`  --colour-${name}-${variationName(label)}: ${hex};`);
        });
    });

    lines.push("}");

    return lines.join("\n");
}

/**
 * Analyses a list of CSS colour values without requiring browser APIs.
 * @param input - Colours separated by newlines, commas, or semicolons.
 * @returns Each input colour's analysis result.
 */
export function analysePalette(input: string): ColourToolResult[] {
    return parsePaletteInput(input).map((colour) => runColourTool({ colour }));
}

export type HarmonyMode = "complementary" | "analogous" | "triadic" | "split-complementary" | "tetradic";
export type PaletteContrast = { first: string; second: string; ratio: number; meetsAA: boolean; meetsAAA: boolean };

/** Generates a colour harmony from a seed colour using HSL hue rotation. */
export function generateHarmonyPalette(seed: string, mode: HarmonyMode): string[] {
    const rgb = parseHexColour(seed);
    if (rgb === null)
        throw new Error("Enter a valid hexadecimal seed colour.");

    const hsl = rgbToHsl(rgb);
    const offsets: Record<HarmonyMode, number[]> = {
        complementary: [0, 180],
        analogous: [0, 30, 330],
        triadic: [0, 120, 240],
        "split-complementary": [0, 150, 210],
        tetradic: [0, 90, 180, 270],
    };

    return offsets[mode].map((offset) => rgbToHex(hslToRgb({ ...hsl, h: (hsl.h + offset) % 360 })));
}

/** Calculates pairwise WCAG contrast ratios for every unique colour pair. */
export function getPaletteContrast(results: readonly ColourToolResult[]): PaletteContrast[] {
    const pairs: PaletteContrast[] = [];
    for (let i = 0; i < results.length; i++) {
        for (let j = i + 1; j < results.length; j++) {
            const first = results[i]!;
            const second = results[j]!;
            const ratio = contrastRatio(first.luminance, second.luminance);
            pairs.push({
                first: first.hex,
                second: second.hex,
                meetsAA: ratio >= 4.5,
                meetsAAA: ratio >= 7,
                ratio,
            });
        }
    }
    return pairs;
}

