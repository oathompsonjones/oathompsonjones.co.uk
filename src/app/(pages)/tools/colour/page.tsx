import { ToolPage } from "components/pages/tools";
import { ColourToolForm } from "components/pages/tools/colour/form";
import type { ReactNode } from "react";

/** Presents the colour palette and contrast utility. */
export default function ColourToolPage(): ReactNode {
    return (
        <ToolPage
            description="Explore colour relationships and check black and white text contrast using WCAG relative luminance."
            title="Colour Palette and Contrast"
        >
            <ColourToolForm />
        </ToolPage>
    );
}
