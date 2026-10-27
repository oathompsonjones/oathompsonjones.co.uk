import type { Metadata } from "next";
import { layout } from "components/layout";
import { pageMetadata } from "utils";

export const metadata: Metadata = pageMetadata(
    "Project Euler Solutions",
    "Browse Oliver Jones’s TypeScript solutions to Project Euler mathematical and programming problems.",
    "/project-euler",
);

export default layout();
