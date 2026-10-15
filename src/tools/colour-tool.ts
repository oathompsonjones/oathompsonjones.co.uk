import { z } from "zod";

export const colourToolRequestSchema = z.object({
    colour: z.string().trim().min(1)
        .max(32),
});

export type ColourToolRequest = z.infer<typeof colourToolRequestSchema>;

export const colourToolResultSchema = z.object({
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

export type InputFormat = "cmyk" | "css" | "hex" | "hsl" | "hsv" | "hwb" | "rgb";
export const DEFAULT_COLOUR = "#1C7EEA";
export const CSS_NAMED_COLOURS = [
    "aliceblue",
    "antiquewhite",
    "aqua",
    "aquamarine",
    "azure",
    "beige",
    "bisque",
    "black",
    "blanchedalmond",
    "blue",
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "coral",
    "cornflowerblue",
    "cornsilk",
    "crimson",
    "cyan",
    "darkblue",
    "darkcyan",
    "darkgoldenrod",
    "darkgray",
    "darkgreen",
    "darkgrey",
    "darkkhaki",
    "darkmagenta",
    "darkolivegreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darksalmon",
    "darkseagreen",
    "darkslateblue",
    "darkslategray",
    "darkslategrey",
    "darkturquoise",
    "darkviolet",
    "deeppink",
    "deepskyblue",
    "dimgray",
    "dimgrey",
    "dodgerblue",
    "firebrick",
    "floralwhite",
    "forestgreen",
    "fuchsia",
    "gainsboro",
    "ghostwhite",
    "gold",
    "goldenrod",
    "gray",
    "green",
    "greenyellow",
    "grey",
    "honeydew",
    "hotpink",
    "indianred",
    "indigo",
    "ivory",
    "khaki",
    "lavender",
    "lavenderblush",
    "lawngreen",
    "lemonchiffon",
    "lightblue",
    "lightcoral",
    "lightcyan",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgreen",
    "lightgrey",
    "lightpink",
    "lightsalmon",
    "lightseagreen",
    "lightskyblue",
    "lightslategray",
    "lightslategrey",
    "lightsteelblue",
    "lightyellow",
    "lime",
    "limegreen",
    "linen",
    "magenta",
    "maroon",
    "mediumaquamarine",
    "mediumblue",
    "mediumorchid",
    "mediumpurple",
    "mediumseagreen",
    "mediumslateblue",
    "mediumspringgreen",
    "mediumturquoise",
    "mediumvioletred",
    "midnightblue",
    "mintcream",
    "mistyrose",
    "moccasin",
    "navajowhite",
    "navy",
    "oldlace",
    "olive",
    "olivedrab",
    "orange",
    "orangered",
    "orchid",
    "palegoldenrod",
    "palegreen",
    "paleturquoise",
    "palevioletred",
    "papayawhip",
    "peachpuff",
    "peru",
    "pink",
    "plum",
    "powderblue",
    "purple",
    "rebeccapurple",
    "red",
    "rosybrown",
    "royalblue",
    "saddlebrown",
    "salmon",
    "sandybrown",
    "seagreen",
    "seashell",
    "sienna",
    "silver",
    "skyblue",
    "slateblue",
    "slategray",
    "slategrey",
    "snow",
    "springgreen",
    "steelblue",
    "tan",
    "teal",
    "thistle",
    "tomato",
    "turquoise",
    "violet",
    "wheat",
    "white",
    "whitesmoke",
    "yellow",
    "yellowgreen",
].map((colour) => colour.trim());

/**
 * Normalises a colour input to a hexadecimal string.
 * @param input - The colour input string.
 * @param format - The format of the input colour ("hex", "rgb", "hsl", or "hsv").
 * @returns The normalised hexadecimal colour string.
 * @throws Will throw an error if the input colour is invalid or cannot be normalised.
 */
// eslint-disable-next-line max-statements
export function normaliseColour(input: string, format: InputFormat): string {
    const value = input.trim();
    const hex = (rgb: number[]): string => `#${rgb.map((n) => clamp(Math.round(n), 0, 255)
        .toString(16).padStart(2, "0")).join("")}`.toUpperCase();

    if (format === "hex") {
        if (!(/^#?(?:[\da-f]{3}|[\da-f]{6})$/i).test(value))
            throw new Error("Enter a 3- or 6-digit hexadecimal colour.");

        const digits = value.replace(/^#/, "");

        return hex(digits.length === 3
            ? [...digits].map((d) => parseInt(d + d, 16))
            : [0, 2, 4].map((i) => parseInt(digits.slice(i, i + 2), 16)));
    }

    if (format === "rgb" || format === "hsl" || format === "hsv" || format === "hwb" || format === "cmyk") {
        const match = (/^(?:rgb|rgba|hsl|hsla|hsv|hwb|cmyk)\\(\\s*([^)]*)\\)$/i).exec(value);
        const parts = (match?.[1] ?? value).split(/[\\s,/%]+/).filter(Boolean).map(Number);
        const expectedParts = format === "cmyk" ? 4 : 3;

        if (parts.length !== expectedParts || parts.some((n) => !Number.isFinite(n)))
            throw new Error(`Enter ${expectedParts} numeric components for ${format.toUpperCase()}.`);

        if (format === "rgb")
            return hex(parts);

        if (format === "cmyk") {
            if (parts.length !== 4)
                throw new Error("Enter four CMYK components.");

            const [c, m, y, k] = parts.map((n) => clamp(n / 100, 0, 1));
            return hex([(1 - c!) * (1 - k!) * 255, (1 - m!) * (1 - k!) * 255, (1 - y!) * (1 - k!) * 255]);
        }

        const [h, a, b] = parts;

        if (h === undefined || a === undefined || b === undefined)
            throw new Error("Enter three colour components.");

        if (format === "hsl") {
            const rgb = hslToRgb({ h, l: b, s: a });
            return hex([rgb.r, rgb.g, rgb.b]);
        }

        if (format === "hwb") {
            const whiteness = clamp(a / 100, 0, 1);
            const blackness = clamp(b / 100, 0, 1);
            if (whiteness + blackness >= 1) {
                const grey = whiteness / (whiteness + blackness) * 255;
                return hex([grey, grey, grey]);
            }
            const pure = hslToRgb({ h, s: 100, l: 50 });
            return hex([pure.r, pure.g, pure.b].map((channel) =>
                channel * (1 - whiteness - blackness) + 255 * whiteness));
        }

        const saturation = clamp(a / 100, 0, 1);
        const valueComponent = clamp(b / 100, 0, 1);
        const chroma = valueComponent * saturation;
        const x = chroma * (1 - Math.abs(h / 60 % 2 - 1));
        const m = valueComponent - chroma;
        const sector = (h % 360 + 360) % 360;
        let channels: number[];

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

        return hex(channels.map((n) => (n + m) * 255));
    }

    if (!CSS.supports("color", value))
        throw new Error("Choose a valid CSS named colour.");

    const probe = document.createElement("span");

    probe.style.color = value;
    document.body.append(probe);
    const computed = getComputedStyle(probe).color;

    probe.remove();
    const match = (/^rgba?\(\s*(\d+)\D+(\d+)\D+(\d+)/i).exec(computed);

    if (match === null)
        throw new Error("This CSS colour cannot be converted to opaque sRGB.");

    return hex(match.slice(1).map(Number));
}

/**
 * Formats a hexadecimal colour string into the specified colour format.
 * @param hex - The hexadecimal colour string to format.
 * @param format - The target colour format ("hex", "rgb", "hsl", or "hsv").
 * @returns The colour string formatted in the specified format.
 * @throws Will throw an error if the hexadecimal colour string is invalid.
 */
export function formatColour(hex: string, format: Exclude<InputFormat, "css">): string {
    const digits = hex.replace("#", "");
    const rgb = [0, 2, 4].map((i) => parseInt(digits.slice(i, i + 2), 16));
    const [r, g, b] = rgb.map((channel) => channel / 255) as [number, number, number];

    if (format === "hex")
        return hex;

    if (format === "rgb")
        return `rgb(${rgb.join(", ")})`;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    let hue = 0;

    if (delta !== 0) {
        if (max === r)
            hue = 60 * ((g - b) / delta % 6);
        else if (max === g)
            hue = 60 * ((b - r) / delta + 2);
        else
            hue = 60 * ((r - g) / delta + 4);
    }

    const h = (hue + 360) % 360;

    if (format === "hsl") {
        const lightness = (max + min) / 2;
        const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
        return `hsl(${h.toFixed(1)}, ${(saturation * 100).toFixed(1)}%, ${(lightness * 100).toFixed(1)}%)`;
    }

    if (format === "hsv") {
        const saturation = max === 0 ? 0 : delta / max;
        return `hsv(${h.toFixed(1)}, ${(saturation * 100).toFixed(1)}%, ${(max * 100).toFixed(1)}%)`;
    }

    if (format === "hwb")
        return `hwb(${h.toFixed(1)} ${(min * 100).toFixed(1)}% ${((1 - max) * 100).toFixed(1)}%)`;

    const k = 1 - max;
    const cmyk = max === 0 ? [0, 0, 0, 100]
        : [(1 - r - k) / (1 - k) * 100, (1 - g - k) / (1 - k) * 100,
            (1 - b - k) / (1 - k) * 100, k * 100];
    return `cmyk(${cmyk.map((n) => `${n.toFixed(1)}%`).join(", ")})`;
}

/**
 * Returns an array of colour representations in various formats.
 * @param result - The colour tool result containing various colour representations.
 * @returns An array of objects, each containing a label and the corresponding colour value in that format.
 */
export function colourFormats(result: ColourToolResult): Array<{ label: string; value: string; }> {
    const { b, g, r } = result.rgb;
    const { h, l, s } = result.hsl;
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;
    let hue = 0;

    if (delta !== 0) {
        if (max === red)
            hue = 60 * ((green - blue) / delta % 6);
        else if (max === green)
            hue = 60 * ((blue - red) / delta + 2);
        else
            hue = 60 * ((red - green) / delta + 4);
    }

    const hsvS = max === 0 ? 0 : delta / max * 100;
    const whiteness = min * 100;
    const blackness = (1 - max) * 100;
    const k = 1 - max;
    const cmyk = max === 0
        ? [0, 0, 0, 100]
        : [
            (1 - red - k) / (1 - k) * 100,
            (1 - green - k) / (1 - k) * 100,
            (1 - blue - k) / (1 - k) * 100,
            k * 100,
        ];

    return [
        {
            label: "HEX",
            value: result.hex,
        },
        {
            label: "RGB",
            value: `rgb(${r}, ${g}, ${b})`,
        },
        {
            label: "HSL",
            value: `hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`,
        },
        {
            label: "HSV",
            value: `hsv(${((hue + 360) % 360).toFixed(1)}, ${hsvS.toFixed(1)}%, ${(max * 100).toFixed(1)}%)`,
        },
        {
            label: "HWB",
            value: `hwb(${((hue + 360) % 360).toFixed(1)} ${whiteness.toFixed(1)}% ${blackness.toFixed(1)}%)`,
        },
        {
            label: "CMYK",
            value: `cmyk(${cmyk.map((n) => `${n.toFixed(1)}%`).join(", ")})`,
        },
    ];
}
