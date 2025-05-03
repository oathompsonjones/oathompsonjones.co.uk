"use client";

import { Avatar, Paper, Typography } from "@mui/material";
import Box from "components/layout/stack";
import { GRAVATAR_URL } from "utils";
import Link from "next/link";
import { Name } from "./name";
import type { ReactNode } from "react";
import { Size } from "components/size";
import { SocialLinks } from "./socialLinks";
import Stack from "components/layout/stack";

/**
 * Contains the footer element.
 * @returns The page footer.
 */
export function Footer(): ReactNode {
    return (
        <Paper
            component="footer" square
            sx={{ borderTop: "1px solid var(--mui-palette-primary-main)", p: "0.75rem", zIndex: 1 }}
        >
            <Stack
                direction="row" gap={2}
                sx={{ display: { md: "flex", xs: "none" }, left: "0.75rem", position: "absolute" }}>
                <Avatar src={GRAVATAR_URL} sx={{ float: "left", height: "2rem", width: "2rem" }} />
                <Name id="footer" variant="h6" />
            </Stack>
            <Stack
                direction="row" alignItems="center" sx={{ m: "auto", width: "max-content" }}
                divider={<Typography sx={{ color: "gray", mx: "1rem" }}>•</Typography>}
            >
                <Typography component={Link} href="/privacy">
                    Privacy <Size sm="Policy" />
                </Typography>
                <Typography variant="caption">
                    © <Size sm={`2020-${new Date().getUTCFullYear()}`} /> Oliver Jones
                </Typography>
            </Stack>
            <Box sx={{ display: { md: "block", xs: "none" }, position: "absolute", right: "0.75rem" }}>
                <SocialLinks />
            </Box>
        </Paper>
    );
}
