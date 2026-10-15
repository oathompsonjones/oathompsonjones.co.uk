import { Code } from "components/code";
import type { ReactNode } from "react";
import type { ColourToolResult } from "tools/colour/colour-tool";
import { createPaletteCssVariables } from "tools/colour/palette";

type PaletteCssExportProps = Readonly<{
    results: readonly ColourToolResult[];
    entries: readonly Readonly<{ name: string; }>[];
}>;

/**
 * Displays named CSS custom properties for the palette.
 * @param props - The analysed colours and their assigned names.
 * @returns The CSS custom properties code block.
 */
export function PaletteCssExport(props: PaletteCssExportProps): ReactNode {
    return (
        <Code language="css">
            {createPaletteCssVariables(props.results, props.entries.map(({ name }) => name))}
        </Code>
    );
}
