import type { Metadata } from "next";
import { layout } from "components/layout";
import { pageMetadata } from "utils";

export const metadata: Metadata = pageMetadata(
    "Colour Palette and Contrast",
    "Build colour palettes, inspect colour values, and check WCAG text contrast ratios in your browser.",
    "/tools/colour",
);

export default layout();
