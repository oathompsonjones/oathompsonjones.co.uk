import { type ColourToolResult, type InputFormat, normaliseColour, runColourTool } from "./colour-tool";

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

/**
 * Analyses a list of CSS colour values without requiring browser APIs.
 * @param input - Colours separated by newlines, commas, or semicolons.
 * @returns Each input colour's analysis result.
 */
export function analysePalette(input: string): ColourToolResult[] {
    return parsePaletteInput(input).map((colour) => runColourTool({ colour }));
}
