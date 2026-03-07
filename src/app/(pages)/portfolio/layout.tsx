import Link from "next/link";
import type { Metadata } from "next";
import { Typography } from "@mui/material";
import { layout } from "components/layout";
import { title } from "utils";

export const metadata: Metadata = { title: title("Portfolio") };

export default layout({
    className: "full-width",
    footer: (
        <Typography variant="subtitle1" align="right">
                Visit my <Link href="/github" prefetch={false}>GitHub</Link> profile.
        </Typography>
    ),
    header: (
        <Typography variant="h2" align="center" gutterBottom>
            Portfolio
        </Typography>
    ),
});
