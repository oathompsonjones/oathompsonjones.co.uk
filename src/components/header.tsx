"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import type { MouseEvent } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import useTheme from "@mui/material/styles/useTheme";
import { useThemeContext } from "@/contexts/themeContext";

/**
 * Creates the header element.
 *
 * @returns {JSX.Element} The page header.
 */
export default function Header(): JSX.Element {
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
            {/* Toolbar is essential for properly aligning elements within the AppBar. */}
            <Toolbar component={Container} disableGutters sx={{ flexGrow: 1, width: "100%" }}>
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
                    component={Link}
                    href="/"
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
                    OATHOMPSONJONES
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
        </AppBar>
    );
}
