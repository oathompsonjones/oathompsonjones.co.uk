import Link from "next/link";
import type { Metadata } from "next";
import { Typography } from "@mui/material";
import { layout } from "components/layout";

export const metadata: Metadata = { title: "Oliver Jones | Gallery" };

export default layout({
    className: "full-width",
    footer: (
        <Typography variant="subtitle1" align="right">
                Visit my <Link href="/instagram" prefetch={false}>Instagram</Link> profile.
        </Typography>
    ),
    header: (
        <Typography variant="h2" align="center" gutterBottom>
            Gallery
        </Typography>
    ),
});
