import { Code } from "components/code";
import { JSON_TOOL_MAX_INPUT_LENGTH } from "tools/json/json-toolkit";
import type { ReactNode } from "react";
import { ToolSection } from "components/pages/tools/toolSection";
import { Typography } from "@mui/material";

const API_EXAMPLE = `{
  "operation": "convert",
  "target": "typescript",
  "text": "{\\"name\\":\\"Ada\\",\\"active\\":true}",
  "indent": 2,
  "sortKeys": false
}`;

/**
 * Documents the JSON Toolkit's stateless API endpoint and its limitations.
 * @returns API usage, example request, and response documentation.
 */
export function JsonToolkitApiDocs(): ReactNode {
    return (
        <ToolSection title="API">
            <Typography>
                Send a stateless JSON request to <code>POST /api/tools/json</code>. The endpoint accepts up to
                {" "}{JSON_TOOL_MAX_INPUT_LENGTH.toLocaleString()} characters of source JSON. Request validation
                errors include a stable code and, for malformed JSON, a best-effort line and column.
            </Typography>
            <Typography variant="body2">
                Set <code>operation</code> to one of <code>format | validate | convert</code>. Target formats are{" "}
                <code>json | typescript | xml | yaml | csv | schema</code>. Optional settings are{" "}
                <code>indent</code> (2 or 4), <code>mode</code> (<code>pretty | minify</code>), and{" "}
                <code>sortKeys</code> (boolean).
            </Typography>
            <Code language="bash">
                {`curl -X POST https://oathompsonjones.co.uk/api/tools/json \\
  -H 'Content-Type: application/json' \\
  -d '${API_EXAMPLE}'`}
            </Code>
            <Typography variant="body2">
                Successful responses use <code>{"{ success: true, data: { output, valid, notices } }"}</code>.
                Errors use the shared structured envelope. CSV accepts objects, arrays of objects, or arrays of
                scalar values; it reports when a conversion cannot preserve JSON structure or types.
            </Typography>
        </ToolSection>
    );
}
