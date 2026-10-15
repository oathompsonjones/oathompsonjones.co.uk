"use client";

import { Box, Tab, Tabs } from "@mui/material";
import { ToolPage } from "components/pages/tools";
import { ColourToolApiDocs } from "components/pages/tools/colour/apiDocs";
import { ColourToolForm } from "components/pages/tools/colour/form";
import { ColourToolResults } from "components/pages/tools/colour/results";
import { ColourPaletteInput } from "components/pages/tools/colour/palette";
import { type ReactNode, useCallback, useState } from "react";
import type { ColourToolResult } from "tools/colour/colour-tool";

/**
 * Presents the colour palette and contrast utility.
 * @returns The colour tool page component.
 */
export default function ColourToolPage(): ReactNode {
    const [result, setResult] = useState<ColourToolResult | null>(null);
    const [selectedColour, setSelectedColour] = useState<string | null>(null);
    const [tab, setTab] = useState(0);
    const handleTabChange = useCallback((_event: React.SyntheticEvent, value: number): void => {
        setTab(value);
    }, []);

    return (
        <ToolPage
            description={
                "Explore colour relationships and check black " +
                "and white text contrast using WCAG relative luminance."
            }
            title="Colour Palette and Contrast"
        >
            <Box>
                <Tabs
                    aria-label="Colour tools"
                    onChange={handleTabChange}
                    value={tab}
                    variant="fullWidth"
                >
                    <Tab aria-controls="colour-panel-single" id="colour-tab-single" label="Single colour" />
                    <Tab aria-controls="colour-panel-palette" id="colour-tab-palette" label="Build a palette" />
                </Tabs>
                {tab === 0 && (
                    <Box
                        aria-labelledby="colour-tab-single"
                        id="colour-panel-single"
                        role="tabpanel"
                        sx={{ pt: 2 }}
                    >
                        <ColourToolForm onResult={setResult} selectedColour={selectedColour} />
                        {result !== null && (
                            <Box sx={{ mt: 3 }}>
                                <ColourToolResults onSelectColour={setSelectedColour} result={result} />
                            </Box>
                        )}
                    </Box>
                )}
                {tab === 1 && (
                    <Box
                        aria-labelledby="colour-tab-palette"
                        id="colour-panel-palette"
                        role="tabpanel"
                        sx={{ pt: 2 }}
                    >
                        <ColourPaletteInput />
                    </Box>
                )}
            </Box>
            <ColourToolApiDocs />
        </ToolPage>
    );
}
