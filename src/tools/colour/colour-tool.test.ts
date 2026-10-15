import {
    CSS_NAMED_COLOURS, colourFormats, colourToolRequestSchema, colourToolResultSchema,
    contrastRatio, formatColour, normaliseColour, parseHexColour, relativeLuminance, rgbToHex, runColourTool,
} from "./colour-tool";
import { describe, expect, it } from "vitest";

describe("colour tool", () => {
    it("parses short and long hexadecimal colours", () => {
        expect(parseHexColour("#369")).toEqual({ b: 153, g: 102, r: 51 });
        expect(parseHexColour("336699")).toEqual({ b: 153, g: 102, r: 51 });
        expect(parseHexColour("not-a-colour")).toBeNull();
        expect(rgbToHex({ b: 153, g: 102, r: 51 })).toBe("#336699");
    });

    it("normalises supported colour formats and converts between them", () => {
        expect(normaliseColour("#369", "hex")).toBe("#336699");
        expect(normaliseColour("rgb(51, 102, 153)", "rgb")).toBe("#336699");
        expect(normaliseColour("hsl(210, 50%, 40%)", "hsl")).toBe("#336699");
        expect(normaliseColour("hsv(210, 66.7%, 60%)", "hsv")).toBe("#336699");
        expect(normaliseColour("hwb(210 20% 40%)", "hwb")).toBe("#336699");
        expect(normaliseColour("cmyk(66.7%, 33.3%, 0%, 40%)", "cmyk")).toBe("#336699");
        expect(formatColour("#336699", "rgb")).toBe("rgb(51, 102, 153)");
        expect(formatColour("#336699", "hsl")).toBe("hsl(210.0, 50.0%, 40.0%)");
        expect(formatColour("#336699", "hsv")).toBe("hsv(210.0, 66.7%, 60.0%)");
        expect(formatColour("#336699", "hwb")).toBe("hwb(210.0 20.0% 40.0%)");
        expect(formatColour("#336699", "cmyk")).toBe("cmyk(66.7%, 33.3%, 0.0%, 40.0%)");
    });

    it("provides the CSS named colour options", () => {
        expect(CSS_NAMED_COLOURS).toContain("cornflowerblue");
        expect(CSS_NAMED_COLOURS).toContain("rebeccapurple");
        expect(CSS_NAMED_COLOURS).toContain("grey");
        expect(CSS_NAMED_COLOURS).toContain("gray");
    });

    it("uses WCAG sRGB relative luminance", () => {
        expect(relativeLuminance({ b: 0, g: 0, r: 0 })).toBe(0);
        expect(relativeLuminance({ b: 255, g: 255, r: 255 })).toBe(1);
        expect(relativeLuminance({ b: 0, g: 0, r: 255 })).toBeCloseTo(0.2126, 4);
    });

    it("calculates known WCAG contrast ratios", () => {
        expect(contrastRatio(1, 0)).toBe(21);
        expect(contrastRatio(relativeLuminance({ b: 119, g: 119, r: 119 }), 1)).toBeCloseTo(4.478, 2);
    });

    it("recommends the higher-contrast text and reports WCAG AA thresholds", () => {
        const dark = runColourTool({ colour: "#336699" });

        expect(dark.contrast.recommended).toBe("white");
        expect(dark.contrast.whiteMeetsAA).toBe(true);
        expect(dark.palette).toHaveLength(8);

        const light = runColourTool({ colour: "#FFFFFF" });

        expect(light.contrast.recommended).toBe("black");
        expect(light.contrast.blackMeetsAA).toBe(true);
    });
    it("formats all representations from the analysis result", () => {
        const formats = colourFormats(runColourTool({ colour: "#336699" }));

        expect(formats.map(({ label }) => label)).toEqual(["HEX", "RGB", "HSL", "HSV", "HWB", "CMYK"]);
        expect(formats.map(({ value }) => value)).toEqual([
            "#336699",
            "rgb(51, 102, 153)",
            "hsl(210.0, 50.0%, 40.0%)",
            "hsv(210.0, 66.7%, 60.0%)",
            "hwb(210.0 20.0% 40.0%)",
            "cmyk(66.7%, 33.3%, 0.0%, 40.0%)",
        ]);
    });

    it("rejects malformed hexadecimal and component input", () => {
        expect(() => normaliseColour("#12", "hex")).toThrow(/3- or 6-digit/);
        expect(() => normaliseColour("rgb(1, 2)", "rgb")).toThrow(/3 numeric components/);
        expect(() => normaliseColour("cmyk(1, 2, nope, 4)", "cmyk")).toThrow(/numeric components/);
        expect(() => runColourTool({ colour: "not-a-colour" })).toThrow(/hexadecimal colour/);
    });

    it("validates colour tool requests and generated results", () => {
        expect(colourToolRequestSchema.safeParse({ colour: "  #369  " }).success).toBe(true);
        expect(colourToolRequestSchema.safeParse({ colour: "" }).success).toBe(false);
        expect(colourToolRequestSchema.safeParse({ colour: "x".repeat(33) }).success).toBe(false);
        expect(colourToolResultSchema.safeParse(runColourTool({ colour: "#369" })).success).toBe(true);
        expect(colourToolResultSchema.safeParse({ colour: "#369" }).success).toBe(false);
    });

    it("clamps RGB and CMYK components to their supported ranges", () => {
        expect(normaliseColour("rgb(300, -10, 128)", "rgb")).toBe("#FF0080");
        expect(normaliseColour("cmyk(0%, 0%, 0%, 0%)", "cmyk")).toBe("#FFFFFF");
        expect(normaliseColour("cmyk(0%, 0%, 0%, 100%)", "cmyk")).toBe("#000000");
    });

    it("handles achromatic colours and out-of-range HWB components", () => {
        expect(normaliseColour("hwb(210 60% 60%)", "hwb")).toBe("#808080");
        expect(normaliseColour("hsl(0, 0%, 0%)", "hsl")).toBe("#000000");
        expect(normaliseColour("hsl(0, 0%, 100%)", "hsl")).toBe("#FFFFFF");
    });
});
