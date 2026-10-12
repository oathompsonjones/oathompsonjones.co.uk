import { HashEncodingApiDocs } from "components/pages/tools/hash-encoding/apiDocs";
import { HashEncodingForm } from "components/pages/tools/hash-encoding/form";
import type { ReactNode } from "react";
import { ToolPage } from "components/pages/tools";

/**
 * Provides stateless text encoding and hashing utilities.
 * @returns The Hash and Encoding page.
 */
export default function HashEncodingPage(): ReactNode {
    return (
        <ToolPage
            description="Encode or decode UTF-8 text, or create an MD5, SHA-1, or SHA-2 hash. Hashing isn't encryption."
            title="Hash and Encoding"
        >
            <HashEncodingForm />
            <HashEncodingApiDocs />
        </ToolPage>
    );
}
