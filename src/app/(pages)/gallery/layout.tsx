import Link from "next/link";
import type { Metadata } from "next";
import { Typography } from "@mui/material";
import { layout } from "components/layout";
import { pageMetadata } from "utils";

export const metadata: Metadata = pageMetadata(
    "Gallery",
    "Browse photos shared by Oliver Jones from university, travel, and everyday life.",
    "/gallery",
);

export default layout({
    className: "full-width",
    footer: (
        <Typography align="right" variant="subtitle1">
            Visit my <Link href="/instagram" prefetch={false}>Instagram</Link> profile.
        </Typography>
    ),
    header: (
        <Typography align="center" component="h1" gutterBottom variant="h2">
            Gallery
        </Typography>
    ),
});
