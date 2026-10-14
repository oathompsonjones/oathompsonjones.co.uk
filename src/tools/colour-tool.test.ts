import { describe, expect, it } from "vitest";
import { contrastRatio, parseHexColour, relativeLuminance, runColourTool, rgbToHex } from "./colour-tool";

describe("colour tool", () => {
    it("parses short and long hexadecimal colours", () => {
        expect(parseHexColour("#369")).toEqual({ b: 153, g: 102, r: 51 });
        expect(parseHexColour("336699")).toEqual({ b: 153, g: 102, r: 51 });
        expect(parseHexColour("not-a-colour")).toBeNull();
        expect(rgbToHex({ b: 153, g: 102, r: 51 })).toBe("#336699");
    });

    it("uses WCAG sRGB relative luminance", () => {
        expect(relativeLuminance({ r: 0, g: 0, b: 0 })).toBe(0);
        expect(relativeLuminance({ r: 255, g: 255, b: 255 })).toBe(1);
        expect(relativeLuminance({ r: 255, g: 0, b: 0 })).toBeCloseTo(0.2126, 4);
    });

    it("calculates known WCAG contrast ratios", () => {
        expect(contrastRatio(1, 0)).toBe(21);
        expect(contrastRatio(relativeLuminance({ r: 119, g: 119, b: 119 }), 0)).toBeCloseTo(4.478, 2);
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
