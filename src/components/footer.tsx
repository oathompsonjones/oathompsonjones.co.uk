"use client";

import { Avatar, Divider, Paper, Stack, Typography } from "@mui/material";
import { GRAVATAR_URL } from "utils";
import Link from "next/link";
import Name from "./name";
import type { ReactElement } from "react";
import SocialLinks from "./socialLinks";
import Spacer from "./spacer";
import { usePathname } from "next/navigation";
import { useThemeContext } from "contexts/themeContext";

/**
 * Contains the footer element.
 * @returns The page footer.
 */
export default function Footer(): ReactElement {
    const { theme: { palette: { primary: { main } } } } = useThemeContext();
    const pathname = usePathname();

    return (
        <Paper
            component="footer"
            square
            sx={{
                borderTop: `1px solid ${main}`,
                p: "1rem",
                scrollSnapAlign: pathname === "/" ? "end" : "none",
                zIndex: 1,
            }}
        >
            <Stack divider={<Divider sx={{ mb: "0.5%" }} />}>
                <Stack alignItems="center" direction="row">
                    <Avatar src={GRAVATAR_URL} sx={{ m: "1%" }} />
                    <Name id="footer" minScreenSize="md" variant="h4" />
                    <Spacer />
                    <SocialLinks />
                </Stack>
                <Stack
                    alignItems="center"
                    direction="row"
                    divider={<Typography color="gray" sx={{ m: "0 0.5%" }}>•</Typography>}
                    justifyContent="center"
                >
                    <Typography align="center" color="primary.main" component={Link} href="/contact" variant="caption">
                        Contact
                    </Typography>
                    <Typography align="center" color="primary.main" component={Link} href="/privacy" variant="caption">
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
