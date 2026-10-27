import type { Metadata } from "next";
import { layout } from "components/layout";
import { pageMetadata } from "utils";

export const metadata: Metadata = pageMetadata(
    "Contact Me",
    "Contact Oliver Jones about software development, projects, or professional opportunities.",
    "/contact",
);

export default layout();
