"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
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

const SMALL_NAV = "xs";
const LARGE_NAV = "md";

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
        <AppBar enableColorOnDark position="sticky" sx={{ backgroundImage: "none" }}>
            {/* Toolbar is essential for properly aligning elements within the AppBar. */}
            <Toolbar>
                {/* This Box contains the nav bar for smaller displays. */}
                <Box sx={{ display: { [LARGE_NAV]: "none", [SMALL_NAV]: "flex" } }}>
                    {/* Displays the menu icon to access the dropdown nav menu. */}
                    <IconButton color="inherit" onClick={handleOpenNavMenu} size="large">
                        <MenuIcon />
                    </IconButton>
                    {/* Contains the dropdown nav menu. */}
                    <Menu
                        anchorEl={anchorElNav}
                        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                        onClose={handleCloseNavMenu}
                        open={Boolean(anchorElNav)}
                        sx={{ display: { [LARGE_NAV]: "none", [SMALL_NAV]: "block" } }}
                        transformOrigin={{ horizontal: "left", vertical: "top" }}
                    >
                        {pages.map((page, i) => (
                            <MenuItem component={Link} href={page.link} key={i} onClick={handleCloseNavMenu}>
                                <Typography>{page.label}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                {/* Displays the main page title for the nav bar. This renders on displays of any size. */}
                <Typography
                    align="center"
                    component={Link}
                    href="/"
                    noWrap
                    sx={{
                        color: "white",
                        flexGrow: { [LARGE_NAV]: 0, [SMALL_NAV]: 1 },
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem"
                    }}
                    variant="h5"
                >
                    OATHOMPSONJONES
                </Typography>
                {/* This Box contains the nav bar for larger displays. */}
                <Box sx={{ display: { [LARGE_NAV]: "flex", [SMALL_NAV]: "none" }, flexGrow: 1 }}>
                    {pages.map((page, i) => (
                        <MenuItem component={Link} href={page.link} key={i}>
                            <Typography>{page.label}</Typography>
                        </MenuItem>
                    ))}
                </Box>
                {/* Renders a button to control dark/light theme. This renders on displays of any size. */}
                <IconButton color="inherit" onClick={toggleTheme}>
                    {theme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
