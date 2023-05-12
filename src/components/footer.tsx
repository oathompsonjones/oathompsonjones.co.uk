"use client";
import { Avatar, Divider, Stack, Typography } from "@mui/material";
import { GRAVATAR_URL } from "utils";
import Link from "next/link";
import SocialLinks from "./socialLinks";
import Spacer from "./spacer";
import { useThemeContext } from "contexts/themeContext";

/**
 * Contains the footer element.
 *
 * @returns {JSX.Element} The page footer.
 */
export default function Footer(): JSX.Element {
    const {
        theme: {
            palette: {
                primary: { main },
                background: { paper: backgroundColor }
            }
        }
    } = useThemeContext();

    return (
        <Stack
            component="footer"
            divider={<Divider sx={{ mb: "0.5%" }} />}
            sx={{ backgroundColor, borderTop: `1px solid ${main}`, p: "1%" }}
        >
            <Stack alignItems="center" direction="row">
                <Avatar src={GRAVATAR_URL} sx={{ m: "1%" }} />
                <Typography variant="h4">Oliver Jones</Typography>
                <Spacer />
                <SocialLinks />
            </Stack>
            <Stack
                alignItems="center"
                direction="row"
                divider={<Typography color="gray" sx={{ m: "0 0.5%" }}>•</Typography>}
                justifyContent="center"
            >
                <Typography align="center" component={Link} href="/contact" variant="caption">
                    Contact
                </Typography>
                <Typography align="center" component={Link} href="/privacy" variant="caption">
                    Privacy Policy
                </Typography>
                <Typography align="center" variant="caption">
                    © {new Date().getUTCFullYear()} Oliver Jones
                </Typography>
            </Stack>
        </Stack>
    );
}
