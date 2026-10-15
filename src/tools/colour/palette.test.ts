/* eslint-disable sort-imports, @stylistic/padding-line-between-statements */
import { MAX_PALETTE_COLOURS, createPaletteCssVariables, parsePaletteInput } from "./palette";
import { describe, expect, it } from "vitest";
import { runColourTool } from "./colour-tool";

describe("colour palette helpers", () => {
    it("normalises different colour formats and preserves commas inside colour functions", () => {
        expect(parsePaletteInput(" #369\nrgb(28, 126, 234), hsl(0, 78%, 56%); #FFFFFF ")).toEqual([
            "#336699",
            "#1C7EEA",
            "#E63737",
            "#FFFFFF",
        ]);
    });

    it("rejects empty palettes, invalid colours, and more than the supported limit", () => {
        expect(() => parsePaletteInput(" \n , ; ")).toThrow(/at least one/);
        expect(() => parsePaletteInput("#123, definitely-not-a-colour")).toThrow(/Invalid colour/);
        expect(() => parsePaletteInput(Array.from(
            { length: MAX_PALETTE_COLOURS + 1 },
            () => "#123",
        ).join("\n"))).toThrow(/no more than 12/);
    });

    it("exports palette variants as stable CSS custom properties", () => {
        const css = createPaletteCssVariables([
            runColourTool({ colour: "#336699" }),
            runColourTool({ colour: "#E63946" }),
        ]);

        expect(css).toContain(":root {");
        expect(css).toContain("--colour-primary-base: #336699;");
        expect(css).toContain("--colour-primary-light:");
        expect(css).toContain("--colour-primary-analogous-plus-30:");
        expect(css).toContain("--colour-secondary-base: #E63946;");
        expect(css).toContain("--colour-secondary-complementary:");
        expect(css.endsWith("}")).toBe(true);
        expect(css.match(/--colour-/g)).toHaveLength(16);
    });

    it("returns a valid empty CSS block when no colours are supplied", () => {
        expect(createPaletteCssVariables([])).toBe(":root {\n}");
    });
});


describe("palette harmonies and pairwise contrast", () => {
    it("generates the expected number of colours for each harmony", async () => {
        const { generateHarmonyPalette } = await import("./palette");
        expect(generateHarmonyPalette("#336699", "complementary")).toHaveLength(2);
        expect(generateHarmonyPalette("#336699", "analogous")).toHaveLength(3);
        expect(generateHarmonyPalette("#336699", "triadic")).toHaveLength(3);
        expect(generateHarmonyPalette("#336699", "split-complementary")).toHaveLength(3);
        expect(generateHarmonyPalette("#336699", "tetradic")).toHaveLength(4);
    });

    it("reports WCAG AA and AAA status for each unique colour pair", async () => {
        const { getPaletteContrast } = await import("./palette");
        const pairs = getPaletteContrast([
            runColourTool({ colour: "#000000" }),
            runColourTool({ colour: "#FFFFFF" }),
            runColourTool({ colour: "#777777" }),
        ]);
        expect(pairs).toHaveLength(3);
        expect(pairs[0]).toMatchObject({ ratio: 21, meetsAA: true, meetsAAA: true });
        expect(pairs[2]!.meetsAA).toBe(false);
        expect(pairs[2]!.meetsAAA).toBe(false);
    });
});
