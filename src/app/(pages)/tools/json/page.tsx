import { JsonToolkitApiDocs } from "components/pages/tools/json/apiDocs";
import { JsonToolkitForm } from "components/pages/tools/json/form";
import type { ReactNode } from "react";
import { ToolPage } from "components/pages/tools";

/**
 * Provides a single API-backed surface for validating, formatting, and converting JSON.
 * @returns The JSON Toolkit page.
 */
export default function JsonToolPage(): ReactNode {
    return (
        <ToolPage
            description="Validate and format JSON, or convert it to TypeScript, XML, YAML, CSV, and JSON Schema."
            title="JSON Toolkit"
        >
            <JsonToolkitForm />
            <JsonToolkitApiDocs />
        </ToolPage>
    );
}
