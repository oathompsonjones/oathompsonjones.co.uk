import Link from "next/link";
import type { Metadata } from "next";
import { Typography } from "@mui/material";
import { layout } from "components/layout";
import { pageMetadata } from "utils";

export const metadata: Metadata = pageMetadata(
    "Portfolio",
    "Explore software projects by Oliver Jones, including featured work and open source repositories.",
    "/portfolio",
);

export default layout({
    className: "full-width",
    footer: (
        <Typography align="right" variant="subtitle1">
            Visit my <Link href="/github" prefetch={false}>GitHub</Link> profile.
        </Typography>
    ),
    header: (
        <Typography align="center" component="h1" gutterBottom variant="h2">
            Portfolio
        </Typography>
    ),
});
