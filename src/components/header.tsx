"use client";
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography, useScrollTrigger, useTheme } from "@mui/material";
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon, Menu as MenuIcon } from "@mui/icons-material";
import Link from "next/link";
import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useThemeContext } from "contexts/themeContext";

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
    const { palette: { mode: theme, primary: { dark, light } } } = useTheme();
    const { toggleTheme } = useThemeContext();

    // Handles behaviour for chaning the nav bar colour when scrolling.
    const scrolling: boolean = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
    const pathname = usePathname();
    const textColour = { dark: light, light: dark }[pathname === "/" ? "dark" : theme];

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
        <AppBar
            component="header"
            enableColorOnDark
            position="sticky"
            sx={{
                background: scrolling ? null : "none",
                backgroundImage: "none",
                boxShadow: scrolling ? null : "none",
                color: scrolling ? null : textColour
            }}
        >
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
                    color={scrolling ? light : textColour}
                    component={Link}
                    href="/"
                    noWrap
                    sx={{
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
                <Box sx={{ display: { [LARGE_NAV]: "flex", [SMALL_NAV]: "none" }, flex: 1 }}>
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
