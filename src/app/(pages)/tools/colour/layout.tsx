import type { Metadata } from "next";
import { layout } from "components/layout";
import { title } from "utils";

export const metadata: Metadata = {
    description: "Explore colour palettes and calculate WCAG text contrast ratios.",
    title: title("Colour Palette and Contrast"),
};

export default layout();
