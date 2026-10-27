import type { Metadata } from "next";
import { layout } from "components/layout";
import { pageMetadata } from "utils";

export const metadata: Metadata = pageMetadata(
    "Articles",
    "Read software development articles, programming notes, and technical projects by Oliver Jones.",
    "/articles",
);

export default layout();
