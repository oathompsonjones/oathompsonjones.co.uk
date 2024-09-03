"use client";

import { Avatar, Divider, Paper, Typography } from "@mui/material";
import Box from "components/layout/box";
import { GRAVATAR_URL } from "utils";
import Link from "next/link";
import { Name } from "./name";
import type { ReactNode } from "react";
import { SocialLinks } from "./socialLinks";
import Stack from "components/layout/stack";

/**
 * Contains the footer element.
 * @returns The page footer.
 */
export function Footer(): ReactNode {
    return (
        <Paper
            component="footer"
            square
            sx={{ borderTop: "1px solid var(--mui-palette-primary-main)", p: "1rem", zIndex: 1 }}
        >
            <Stack divider={<Divider sx={{ my: "0.5%" }} />}>
                <Stack sx={{ alignItems: "center" }} direction="row">
                    <Avatar src={GRAVATAR_URL} sx={{ m: "1%" }} />
                    <Box sx={{ flex: 1 }}>
                        <Name id="footer" minScreenSize="md" variant="h4" />
                    </Box>
                    <SocialLinks />
                </Stack>
                <Stack
                    direction="row"
                    divider={<Typography sx={{ color: "gray", m: "0 0.5%" }}>•</Typography>}
                    sx={{ alignItems: "center", justifyContent: "center" }}
                >
                    <Typography
                        align="center"
                        component={Link}
                        href="/contact"
                        variant="caption"
                        sx={{ color: "primary.main" }}
                    >
                        Contact
                    </Typography>
                    <Typography
                        align="center"
                        component={Link}
                        href="/privacy"
                        variant="caption"
                        sx={{ color: "primary.main" }}
                    >
                        Privacy Policy
                    </Typography>
                    <Typography align="center" variant="caption">
                        © 2020-{new Date().getUTCFullYear()} Oliver Jones
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    );
}
