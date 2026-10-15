import type { ReactNode } from "react";
import { Code } from "components/code";
import type { ColourToolResult } from "tools/colour/colour-tool";
import { createPaletteCssVariables } from "tools/colour/palette";

type PaletteCssExportProps = {
    results: ColourToolResult[];
    entries: Array<{ name: string; }>;
};

/** Displays named CSS custom properties for the palette. */
export function PaletteCssExport({ results, entries }: PaletteCssExportProps): ReactNode {
    return (
        <Code language="css">
            {createPaletteCssVariables(results, entries.map(({ name }) => name))}
        </Code>
    );
}
