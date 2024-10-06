"use client";

import { Avatar, Divider, Paper, Typography } from "@mui/material";
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
            component="footer"
            square
            sx={{ borderTop: "1px solid var(--mui-palette-primary-main)", p: "1rem", zIndex: 1 }}
        >
            <Stack className="full-width" divider={<Divider />}>
                <Stack sx={{ alignItems: "center" }} direction={{ sm: "row" }}>
                    <Stack direction="row" sx={{ alignItems: "center", flex: 1 }} gap="1rem">
                        <Avatar src={GRAVATAR_URL} sx={{ m: "1%" }} />
                        <Name id="footer" minScreenSize="md" variant="h4" />
                    </Stack>
                    <SocialLinks />
                </Stack>
                <Stack
                    direction="row"
                    divider={<Typography sx={{ color: "gray", mx: "1rem" }}>•</Typography>}
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
                        <Size xs="Privacy" sm="Privacy Policy" />
                    </Typography>
                    <Typography align="center" variant="caption">
                        <Size xs="© Oliver Jones" sm={`© 2020-${new Date().getUTCFullYear()} Oliver Jones`} />
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    );
}
