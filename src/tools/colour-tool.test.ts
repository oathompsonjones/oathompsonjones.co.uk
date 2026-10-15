import { CSS_NAMED_COLOURS, contrastRatio, formatColour, normaliseColour, parseHexColour, relativeLuminance, rgbToHex, runColourTool } from "./colour-tool";
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
        expect(formatColour("#336699", "rgb")).toBe("rgb(51, 102, 153)");
        expect(formatColour("#336699", "hsl")).toBe("hsl(210.0, 50.0%, 40.0%)");
        expect(formatColour("#336699", "hsv")).toBe("hsv(210.0, 66.7%, 60.0%)");
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
});
