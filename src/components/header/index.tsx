"use client";

import { AppBar, Button, IconButton, Toolbar, Typography, useMediaQuery, useScrollTrigger } from "@mui/material";
import { Contrast, DarkMode, LightMode, Menu } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Dropdown } from "./dropdown";
import { Fixed } from "./fixed";
import { Floating } from "./floating";
import type { ReactNode } from "react";
import type { Theme } from "@mui/material";
import { useOutsideClick } from "hooks/useOutsideClick";
import { usePathname } from "next/navigation";
import { useThemeMode } from "hooks/useThemeMode";

/**
 * Creates the header element.
 * @returns The page header.
 */
export function Header(): ReactNode {
    // Access the site theme.
    const {
        switchThemeMode,
        theme: { palette: { common: { black, white } } },
        themeColour,
        themeMode,
    } = useThemeMode();

    // Handles behaviour for changing nav bar colour and opening/closing dropdown menu.
    const isScrolling: boolean = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
    const isMobile: boolean = useMediaQuery((theme: Theme): string => theme.breakpoints.down("md"));
    const isHome: boolean = usePathname() === "/";
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleNavOpen = (): void => setIsDropdownOpen(() => isMobile && !isDropdownOpen);
    const ref = useOutsideClick(() => setIsDropdownOpen(false));

    useEffect(() => setIsDropdownOpen(false), []);

    const isSolid = isDropdownOpen || isScrolling && isMobile;
    const textColour = isSolid ? white : { dark: white, light: black }[isHome ? "dark" : themeColour];

    // Associate a label and link with each page.
    const pages: Array<{ label: string; link: string; }> = [
        { label: "Home", link: "/" },
        { label: "About Me", link: "/about" },
        { label: "Portfolio", link: "/portfolio" },
        { label: "Gallery", link: "/gallery" },
        { label: "Contact Me", link: "/contact" },
    ];

    return (
        <AppBar
            component="header"
            enableColorOnDark
            position={isMobile || isHome ? "sticky" : "relative"}
            ref={ref}
            sx={{
                background: "var(--background)",
                backgroundImage: "none",
                boxShadow: "var(--box-shadow)",
                color: "var(--color)",
            }}
            style={{
                /* eslint-disable @typescript-eslint/naming-convention */
                "--background": isSolid ? "var(--mui-palette-primary-main)" : "none",
                "--box-shadow": isSolid ? "var(--Paper-shadow)" : "none",
                "--color": textColour,
                /* eslint-enable @typescript-eslint/naming-convention */
            }}
        >
            <Toolbar className="full-width">
                {/* Menu button to open/close the drop down nav. */}
                <IconButton color="inherit" onClick={toggleNavOpen} sx={{ display: { md: "none" } }}>
                    <Menu />
                </IconButton>

                {/* The title. */}
                <Typography
                    align="center"
                    variant="h5"
                    sx={{
                        color: "inherit",
                        flexGrow: { md: 0, xs: 1 },
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                    }}
                >
                    OATHOMPSONJONES
                </Typography>

                {/* The fixed nav for larger displays. */}
                <Fixed pages={pages} />

                {/* Theme button to control dark/light theme. */}
                <Button
                    color="inherit"
                    onClick={switchThemeMode}
                    sx={{ transition: "background-color 0.25s linear" }}
                    endIcon={{ dark: <DarkMode />, light: <LightMode />, system: <Contrast /> }[themeMode]}
                    variant="text"
                >
                    {isMobile ? "" : `${themeMode[0]!.toUpperCase()}${themeMode.slice(1)} Mode`}
                </Button>
            </Toolbar>

            {/* The drop down nav for smaller displays. */}
            <Dropdown isOpen={isDropdownOpen} pages={pages} toggleNavOpen={toggleNavOpen} />

            {/* The floating nav for scrolling on larger displays. */}
            <Floating pages={pages} />
        </AppBar>
    );
}
