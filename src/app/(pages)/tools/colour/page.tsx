"use client";

import { ColourPaletteInput } from "components/pages/tools/colour/palette";
import { ColourToolApiDocs } from "components/pages/tools/colour/apiDocs";
import { ColourToolForm } from "components/pages/tools/colour/form";
import type { ColourToolResult } from "tools/colour/colour-tool";
import { ColourToolResults } from "components/pages/tools/colour/results";
import type { ReactNode } from "react";
import { ToolPage } from "components/pages/tools";
import { useState } from "react";

/**
 * Presents the colour palette and contrast utility.
 * @returns The colour tool page component.
 */
export default function ColourToolPage(): ReactNode {
    const [result, setResult] = useState<ColourToolResult | null>(null);
    const [selectedColour, setSelectedColour] = useState<string | null>(null);

    return (
        <ToolPage
            description={
                "Explore colour relationships and check black " +
                "and white text contrast using WCAG relative luminance."
            }
            title="Colour Palette and Contrast"
        >
            <ColourPaletteInput />
            <ColourToolForm onResult={setResult} selectedColour={selectedColour} />
            {result !== null && (
                <ColourToolResults onSelectColour={setSelectedColour} result={result} />
            )}
            <ColourToolApiDocs />
        </ToolPage>
    );
}
