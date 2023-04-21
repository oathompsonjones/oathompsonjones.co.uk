"use client";
import { Avatar, Container, Divider, Stack, Typography } from "@mui/material";
import { AVATAR_URL } from "@/constants";
import { SocialLinks } from "./socialLinks";
import { useThemeContext } from "@/contexts/themeContext";

/**
 * Contains the footer element.
 *
 * @returns {JSX.Element} The page footer.
 */
export function Footer(): JSX.Element {
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
                        <Avatar src={AVATAR_URL} sx={{ margin: "1%" }} />
                        <Stack flexGrow={1}>
                            <Typography variant="h6">Oliver Andrew</Typography>
                            <Typography variant="h6">Thompson Jones</Typography>
                        </Stack>
                        {/* Social media links */}
                        <SocialLinks />
                    </Stack>
                    {/* Website author legend */}
                    <Typography align="right" flexGrow={1} variant="caption">
                        Website created by <a href="https://oathompsonjones.co.uk">Oliver Jones</a>
                    </Typography>
                </Stack>
            </Container>
        </footer>
    );
}
