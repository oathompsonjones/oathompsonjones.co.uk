import type { Metadata } from "next";
import { layout } from "components/layout";
import { pageMetadata } from "utils";

export const metadata: Metadata = pageMetadata(
    "Article",
    "Read a software development article by Oliver Jones.",
    "/articles",
);

export default layout();
