import type { Metadata } from "next";
import { layout } from "components/layout";
import { pageMetadata } from "utils";

export const metadata: Metadata = pageMetadata(
    "About Me",
    "Read Oliver Jones’s software developer CV, including skills, education, work experience, and volunteering.",
    "/about",
);

export default layout();
