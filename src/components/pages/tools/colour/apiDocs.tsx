import { Code } from "components/code";
import { DEFAULT_COLOUR } from "tools/colour-tool";
import type { ReactNode } from "react";
import { ToolSection } from "components/pages/tools/toolSection";
import { Typography } from "@mui/material";

/**
 * Documents the colour tool's stateless API endpoint.
 * @returns API usage and response documentation.
 */
export function ColourToolApiDocs(): ReactNode {
    return (
        <ToolSection title="API">
            <Typography>
                Send a stateless JSON request to <code>POST /api/tools/colour</code> with a <code> colour</code> field
                containing a hexadecimal sRGB colour. The endpoint returns the colour details, WCAG contrast results,
                and generated palette.
            </Typography>
            <Code language="bash">
                {`curl -X POST https://oathompsonjones.co.uk/api/tools/colour \\
  -H 'Content-Type: application/json' \\
  -d '{"colour":"${DEFAULT_COLOUR}"}'`}
            </Code>
            <Typography variant="body2">
                Successful responses use the shared <code>{"{ success: true, data: ... }"}</code> envelope.
                Invalid colours return a structured <code>INVALID_COLOUR</code> error. The interactive form
                accepts other formats and normalises them to hexadecimal before calling this endpoint.
            </Typography>
        </ToolSection>
    );
}
