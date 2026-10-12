import type { Metadata } from "next";
import { layout } from "components/layout";
import { title } from "utils";

export const metadata: Metadata = {
    description: "Validate, format, and convert JSON to TypeScript, XML, YAML, CSV, and JSON Schema.",
    title: title("JSON Toolkit"),
};

export default layout();
