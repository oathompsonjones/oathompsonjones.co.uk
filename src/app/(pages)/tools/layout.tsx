import type { Metadata } from "next";
import { layout } from "components/layout";
import { pageMetadata } from "utils";

export const metadata: Metadata = pageMetadata(
    "Developer Tools",
    "Use free browser-based tools by Oliver Jones for JSON, text encoding and hashing, and colour contrast.",
    "/tools",
);

export default layout();
