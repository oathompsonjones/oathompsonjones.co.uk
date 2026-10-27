import type { Metadata } from "next";
import { layout } from "components/layout";
import { pageMetadata } from "utils";

export const metadata: Metadata = pageMetadata(
    "Privacy Policy",
    "Read the privacy policy for Oliver Jones’s personal website and contact form.",
    "/privacy",
);

export default layout();
