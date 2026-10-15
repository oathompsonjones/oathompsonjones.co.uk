import { z } from "zod";

export const colourToolRequestSchema = z.object({
    colour: z.string().trim().min(1)
        .max(32),
});

export type ColourToolRequest = z.infer<typeof colourToolRequestSchema>;

export type RGB = { b: number; g: number; r: number; };
export type HSL = { h: number; l: number; s: number; };

export type ColourToolResult = {
    colour: string;
    hex: string;
    rgb: RGB;
    hsl: HSL;
    luminance: number;
    contrast: {
        black: number;
        blackMeetsAA: boolean;
        blackMeetsAALarge: boolean;
        recommended: "black" | "white";
        white: number;
        whiteMeetsAA: boolean;
        whiteMeetsAALarge: boolean;
    };
    palette: Array<{ hex: string; label: string; }>;
};

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/**
 * Parses a CSS-style hexadecimal colour (#RGB or #RRGGBB).
 * @param input - The hexadecimal colour string to parse.
 * @returns The parsed RGB colour, or null if the input is not a valid hexadecimal colour.
 */
export function parseHexColour(input: string): RGB | null {
    const match = (/^#?([\da-f]{3}|[\da-f]{6})$/i).exec(input.trim());

    if (match === null)
        return null;

    let hex = match[1]!;

    if (hex.length === 3)
        hex = [...hex].map((digit) => digit + digit).join("");

    const value = Number.parseInt(hex, 16);

    return { b: value & 255, g: value >> 8 & 255, r: value >> 16 & 255 };
}

/**
 * Formats an RGB colour as a six-digit hexadecimal value.
 * @param colour - The RGB colour to format.
 * @param colour.b - The blue channel (0-255).
 * @param colour.g - The green channel (0-255).
 * @param colour.r - The red channel (0-255).
 * @returns The formatted hexadecimal colour string.
 */
export function rgbToHex({ b, g, r }: RGB): string {
    return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

/**
 * Converts an sRGB channel to its linear-light value for WCAG luminance.
 * @param channel - The sRGB channel value (0-255).
 * @returns The linear-light value of the channel.
 */
function linearise(channel: number): number {
    const value = channel / 255;

    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

/**
 * Calculates WCAG relative luminance for an opaque sRGB colour.
 * @param rgb - The RGB colour to calculate relative luminance for.
 * @returns The relative luminance of the colour.
 */
export function relativeLuminance(rgb: RGB): number {
    return 0.2126 * linearise(rgb.r) + 0.7152 * linearise(rgb.g) + 0.0722 * linearise(rgb.b);
}

/**
 * Calculates the WCAG contrast ratio between two relative luminance values.
 * @param first - The relative luminance of the first colour.
 * @param second - The relative luminance of the second colour.
 * @returns The WCAG contrast ratio between the two colours.
 */
export function contrastRatio(first: number, second: number): number {
    const lighter = Math.max(first, second);
    const darker = Math.min(first, second);

    return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Converts an RGB colour to its HSL representation.
 * @param colour - The RGB colour to convert to HSL.
 * @param colour.b - The blue channel (0-255).
 * @param colour.g - The green channel (0-255).
 * @param colour.r - The red channel (0-255).
 * @returns The corresponding HSL colour.
 */
export function rgbToHsl({ b, g, r }: RGB): HSL {
    const [red, green, blue] = [r / 255, g / 255, b / 255];
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;
    let h = 0;

    if (delta !== 0) {
        if (max === red)
            h = 60 * ((green - blue) / delta % 6);
        else if (max === green)
            h = 60 * ((blue - red) / delta + 2);
        else
            h = 60 * ((red - green) / delta + 4);
    }

    if (h < 0)
        h += 360;

    const l = (max + min) / 2;
    const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    return { h, l: l * 100, s: s * 100 };
}

/**
 * Converts an HSL colour to its RGB representation.
 * @param hsl - The HSL colour to convert to RGB.
 * @param hsl.h - The hue component (0-360).
 * @param hsl.l - The lightness component (0-100).
 * @param hsl.s - The saturation component (0-100).
 * @returns The corresponding RGB colour.
 */
export function hslToRgb({ h, l, s }: HSL): RGB {
    const saturation = clamp(s / 100, 0, 1);
    const lightness = clamp(l / 100, 0, 1);
    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const x = chroma * (1 - Math.abs(h / 60 % 2 - 1));
    const m = lightness - chroma / 2;
    const sector = (h % 360 + 360) % 360;
    let channels: [number, number, number];

    if (sector < 60)
        channels = [chroma, x, 0];
    else if (sector < 120)
        channels = [x, chroma, 0];
    else if (sector < 180)
        channels = [0, chroma, x];
    else if (sector < 240)
        channels = [0, x, chroma];
    else if (sector < 300)
        channels = [x, 0, chroma];
    else
        channels = [chroma, 0, x];

    return {
        b: Math.round((channels[2] + m) * 255),
        g: Math.round((channels[1] + m) * 255),
        r: Math.round((channels[0] + m) * 255),
    };
}

/**
 * Calculates contrast and a small palette from an opaque hex sRGB colour.
 * @param colour - The request object containing the colour to analyse.
 * @param colour.colour - The hexadecimal colour string to analyse.
 * @returns The result of the colour analysis, including contrast ratios and a palette.
 * @throws Will throw an error if the provided colour is not a valid hexadecimal string.
 */
export function runColourTool({ colour }: ColourToolRequest): ColourToolResult {
    const rgb = parseHexColour(colour);

    if (rgb === null)
        throw new Error("Enter a hexadecimal colour such as #336699 or #369.");

    const hex = rgbToHex(rgb);
    const hsl = rgbToHsl(rgb);
    const luminance = relativeLuminance(rgb);
    const black = contrastRatio(luminance, 0);
    const white = contrastRatio(luminance, 1);
    const recommended = black >= white ? "black" : "white";
    const palette = [
        { hex: rgbToHex(hslToRgb({ ...hsl, l: clamp(hsl.l + 25, 0, 100) })), label: "Tint" },
        { hex: rgbToHex(hslToRgb({ ...hsl, l: clamp(hsl.l + 12, 0, 100) })), label: "Light" },
        { hex, label: "Base" },
        { hex: rgbToHex(hslToRgb({ ...hsl, l: clamp(hsl.l - 12, 0, 100) })), label: "Dark" },
        { hex: rgbToHex(hslToRgb({ ...hsl, l: clamp(hsl.l - 25, 0, 100) })), label: "Shade" },
        { hex: rgbToHex(hslToRgb({ ...hsl, h: (hsl.h + 180) % 360 })), label: "Complementary" },
        { hex: rgbToHex(hslToRgb({ ...hsl, h: (hsl.h + 30) % 360 })), label: "Analogous +30°" },
        { hex: rgbToHex(hslToRgb({ ...hsl, h: (hsl.h + 330) % 360 })), label: "Analogous -30°" },
    ];

    return {
        colour: hex,
        contrast: {
            black,
            blackMeetsAA: black >= 4.5,
            blackMeetsAALarge: black >= 3,
            recommended,
            white,
            whiteMeetsAA: white >= 4.5,
            whiteMeetsAALarge: white >= 3,
        },
        hex,
        hsl,
        luminance,
        palette,
        rgb,
    };
}
