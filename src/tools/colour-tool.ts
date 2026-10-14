import { z } from "zod";

export const colourToolRequestSchema = z.object({
    colour: z.string().trim().min(1).max(32),
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
    palette: { hex: string; label: string; }[];
};

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/** Parses a CSS-style hexadecimal colour (#RGB or #RRGGBB). */
export function parseHexColour(input: string): RGB | null {
    const match = /^#?([\da-f]{3}|[\da-f]{6})$/i.exec(input.trim());

    if (match === null)
        return null;

    let hex = match[1]!;

    if (hex.length === 3)
        hex = [...hex].map((digit) => digit + digit).join("");

    const value = Number.parseInt(hex, 16);

    return { b: value & 255, g: (value >> 8) & 255, r: (value >> 16) & 255 };
}

/** Formats an RGB colour as a six-digit hexadecimal value. */
export function rgbToHex({ b, g, r }: RGB): string {
    return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

/** Converts an sRGB channel to its linear-light value for WCAG luminance. */
function linearise(channel: number): number {
    const value = channel / 255;

    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

/** Calculates WCAG relative luminance for an opaque sRGB colour. */
export function relativeLuminance(rgb: RGB): number {
    return 0.2126 * linearise(rgb.r) + 0.7152 * linearise(rgb.g) + 0.0722 * linearise(rgb.b);
}

/** Calculates the WCAG contrast ratio between two relative luminance values. */
export function contrastRatio(first: number, second: number): number {
    const lighter = Math.max(first, second);
    const darker = Math.min(first, second);

    return (lighter + 0.05) / (darker + 0.05);
}

export function rgbToHsl({ b, g, r }: RGB): HSL {
    const [red, green, blue] = [r / 255, g / 255, b / 255];
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;
    let h = 0;

    if (delta !== 0) {
        if (max === red)
            h = 60 * (((green - blue) / delta) % 6);
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

export function hslToRgb({ h, l, s }: HSL): RGB {
    const saturation = clamp(s / 100, 0, 1);
    const lightness = clamp(l / 100, 0, 1);
    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const x = chroma * (1 - Math.abs((h / 60) % 2 - 1));
    const m = lightness - chroma / 2;
    const sector = ((h % 360) + 360) % 360;
    const channels = sector < 60 ? [chroma, x, 0]
        : sector < 120 ? [x, chroma, 0]
            : sector < 180 ? [0, chroma, x]
                : sector < 240 ? [0, x, chroma]
                    : sector < 300 ? [x, 0, chroma]
                        : [chroma, 0, x];

    return {
        b: Math.round((channels[2]! + m) * 255),
        g: Math.round((channels[1]! + m) * 255),
        r: Math.round((channels[0]! + m) * 255),
    };
}

/** Calculates contrast and a small palette from an opaque hex sRGB colour. */
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
