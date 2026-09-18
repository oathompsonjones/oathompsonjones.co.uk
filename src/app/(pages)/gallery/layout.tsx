import Link from "next/link";
import type { Metadata } from "next";
import { Typography } from "@mui/material";
import { layout } from "components/layout";
import { title } from "utils";

export const metadata: Metadata = { title: title("Gallery") };

export default layout({
    className: "full-width",
    footer: (
        <Typography align="right" variant="subtitle1">
            Visit my <Link href="/instagram" prefetch={false}>Instagram</Link> profile.
        </Typography>
    ),
    header: (
        <Typography align="center" gutterBottom variant="h2">
            Gallery
        </Typography>
    ),
});
