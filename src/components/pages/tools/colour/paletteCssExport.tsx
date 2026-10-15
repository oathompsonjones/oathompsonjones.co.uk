import { Code } from "components/code";
import type { ReactNode } from "react";
import type { ColourToolResult } from "tools/colour/colour-tool";
import { createPaletteCssVariables } from "tools/colour/palette";

type PaletteCssExportProps = Readonly<{
    results: ReadonlyArray<ColourToolResult>;
    entries: ReadonlyArray<Readonly<{ name: string; }>>;
}>;

/**
 * Displays named CSS custom properties for the palette.
 * @param root0 - The analysed colours and their assigned names.
 * @param root0.results - The analysed palette colours.
 * @param root0.entries - The named palette entries.
 * @returns The CSS custom properties code block.
 */
export function PaletteCssExport({ results, entries }: PaletteCssExportProps): ReactNode {
    return (
        <Code language="css">
            {createPaletteCssVariables(results, entries.map(({ name }) => name))}
        </Code>
    );
}
