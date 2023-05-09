"use client";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { GRAVATAR_URL } from "@/constants";
import Link from "next/link";
import SocialLinks from "./socialLinks";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useThemeContext } from "@/contexts/themeContext";

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
        <footer style={{
            backgroundColor,
            borderTop: `1px solid ${main}`,
            padding: "1%"
        }}
        >
            <Container disableGutters>
                <Stack divider={<Divider sx={{ margin: "0.5%" }} />}>
                    <Stack alignItems="center" direction="row">
                        {/* Picture and name */}
                        <Avatar src={GRAVATAR_URL} style={{ margin: "1%" }} />
                        <Stack flexGrow={1}>
                            <Typography variant="h6">Oliver Andrew</Typography>
                            <Typography variant="h6">Thompson Jones</Typography>
                        </Stack>
                        {/* Social media links */}
                        <SocialLinks />
                    </Stack>
                    {/* Website author legend */}
                    <Typography align="right" flexGrow={1} variant="caption">
                        Website created by <Link href="/">Oliver Jones</Link>
                    </Typography>
                </Stack>
            </Container>
        </footer>
    );
}
