import type { Metadata } from "next";
import { layout } from "components/layout";
import { pageMetadata } from "utils";

export const metadata: Metadata = pageMetadata(
    "Project Euler Article",
    "An introduction to Project Euler and Oliver Jones’s TypeScript solutions to its programming problems.",
    "/articles/project-euler",
);

export default layout({ className: "wrapper" });
