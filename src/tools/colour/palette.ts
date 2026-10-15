import { parseHexColour, rgbToHex } from "./colour-tool";
import type { ColourToolResult } from "./colour-tool";

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
 * Parses and normalises a list of HEX colours for palette analysis.
 * @param input - Colours separated by newlines, commas, or semicolons.
 * @returns Normalised six-digit HEX colours.
 * @throws If the input is empty, too long, or contains invalid colours.
 */
export function parsePaletteInput(input: string): string[] {
    const colours = input.split(/[\n,;]+/).map((colour) => colour.trim()).filter(Boolean);

    if (colours.length === 0)
        throw new Error("Enter at least one hexadecimal colour.");

    if (colours.length > MAX_PALETTE_COLOURS)
        throw new Error(`Enter no more than ${MAX_PALETTE_COLOURS} colours at a time.`);

    return colours.map((colour) => {
        const parsed = parseHexColour(colour);

        if (parsed === null)
            throw new Error(`Invalid hexadecimal colour: ${colour}. Use #RGB or #RRGGBB.`);

        return rgbToHex(parsed);
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
export function createPaletteCssVariables(results: readonly ColourToolResult[]): string {
    const lines = [":root {"];

    results.forEach((result, index) => {
        const name = PALETTE_LABELS[index] ?? `colour-${index + 1}`;

        result.palette.forEach(({ hex, label }) => {
            lines.push(`  --colour-${name}-${variationName(label)}: ${hex};`);
        });
    });

    lines.push("}");

    return lines.join("\n");
}
