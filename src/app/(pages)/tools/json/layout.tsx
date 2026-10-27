import type { Metadata } from "next";
import { layout } from "components/layout";
import { pageMetadata } from "utils";

export const metadata: Metadata = pageMetadata(
    "JSON Toolkit",
    "Validate and format JSON, or convert it to TypeScript, XML, YAML, CSV, and JSON Schema.",
    "/tools/json",
);

export default layout();
