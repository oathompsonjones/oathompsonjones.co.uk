import type { Metadata } from "next";
import { layout } from "components/layout";
import { pageMetadata } from "utils";

export const metadata: Metadata = pageMetadata(
    "Hash and Encoding",
    "Encode and decode text, apply supported ciphers, and create hashes with this browser-based tool.",
    "/tools/hash-encoding",
);

export default layout();
