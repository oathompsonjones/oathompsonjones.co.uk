"use client";
import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography, useTheme } from "@mui/material";
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon, Menu as MenuIcon } from "@mui/icons-material";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useState } from "react";
import { useThemeContext } from "@/contexts/themeContext";

/**
 * Creates the header element.
 *
 * @returns {JSX.Element} The page header.
 */
export function Header(): JSX.Element {
    // Handles behaviour for the dropdown menu on smaller displays.
    const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>): void => setAnchorElNav(event.currentTarget);
    const handleCloseNavMenu = (): void => setAnchorElNav(null);

    // Access the site theme.
    const { palette: { mode: theme } } = useTheme();
    const { toggleTheme } = useThemeContext();

    // Associate a label and link with each page.
    const pages: Array<{ label: string; link: string; }> = [
        { label: "Home", link: "/" },
        { label: "About Me", link: "/about" },
        { label: "Portfolio", link: "/portfolio" },
        { label: "Gallery", link: "/gallery" },
        { label: "Contact Me", link: "/contact" }
    ];

    // Returns an AppBar element (which renders as an HTML header element).
    return (
        <AppBar enableColorOnDark position="sticky" sx={{ backgroundImage: "none", mb: "1%" }}>
            <Container disableGutters>
                {/* Toolbar is essential for properly aligning elements within the AppBar. */}
                <Toolbar>
                    {/* This Box contains the nav bar for smaller displays. */}
                    <Box sx={{ display: { md: "none", xs: "flex" } }}>
                        {/* Displays the menu icon to access the dropdown nav menu. */}
                        <IconButton color="inherit" onClick={handleOpenNavMenu} size="large">
                            <MenuIcon />
                        </IconButton>
                        {/* Contains the dropdown nav menu. */}
                        <Menu
                            anchorEl={anchorElNav}
                            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                            keepMounted
                            onClose={handleCloseNavMenu}
                            open={Boolean(anchorElNav)}
                            sx={{ display: { md: "none", xs: "block" } }}
                            transformOrigin={{ horizontal: "left", vertical: "top" }}
                        >
                            {
                            // Renders a link to each page.
                                pages.map((page, i) => (
                                    <Link href={page.link} key={i}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography sx={{ color: "#ffffff" }} textAlign="center">
                                                {page.label}
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                ))
                            }
                        </Menu>
                    </Box>
                    {/* Displays the main page title for the nav bar. This renders on displays of any size. */}
                    <Typography
                        align="center"
                        noWrap
                        sx={{
                            color: "#ffffff",
                            flexGrow: { md: 0, xs: 1 },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            mr: 2
                        }}
                        variant="h5"
                    >
                        <Link href="/" style={{ color: "inherit" }}>OATHOMPSONJONES</Link>
                    </Typography>
                    {/* This Box contains the nav bar for larger displays. */}
                    <Box sx={{ display: { md: "flex", xs: "none" }, flexGrow: 1 }}>
                        {
                        // Renders a link to each page.
                            pages.map((page, i) => (
                                <Link href={page.link} key={i}>
                                    <MenuItem>
                                        <Typography sx={{ color: "#ffffff" }} textAlign="center">
                                            {page.label}
                                        </Typography>
                                    </MenuItem>
                                </Link>
                            ))
                        }
                    </Box>
                    {/* Renders a button to control dark/light theme. This renders on displays of any size. */}
                    <IconButton color="inherit" edge="end" onClick={toggleTheme} style={{ float: "right" }} sx={{ mr: 2 }}>
                        {theme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
