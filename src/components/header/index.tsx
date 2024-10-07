"use client";

import { AppBar, Button, IconButton, Toolbar, Typography, useMediaQuery, useScrollTrigger } from "@mui/material";
import { Contrast, DarkMode, LightMode, Menu } from "@mui/icons-material";
import { Dropdown } from "./dropdown";
import { Fixed } from "./fixed";
import { Floating } from "./floating";
import type { ReactNode } from "react";
import { Size } from "components/size";
import type { Theme } from "@mui/material";
import { useOutsideClick } from "hooks/useOutsideClick";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
    const isMedium = useMediaQuery((theme: Theme): string => theme.breakpoints.up("md"));
    const isHome: boolean = usePathname() === "/";
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleNavOpen = (): void => setIsDropdownOpen((prev) => !prev);
    const ref = useOutsideClick(() => setIsDropdownOpen(false));

    const isSolid = isDropdownOpen || isScrolling && !isMedium;
    const textColour = isSolid ? white : { dark: white, light: black }[isHome ? "dark" : themeColour];

    // Associate a label and link with each page.
    const pages: Array<{ label: string; link: string; }> = [
        { label: "Home", link: "/" },
        { label: "About Me", link: "/about" },
        { label: "Portfolio", link: "/portfolio" },
        { label: "Gallery", link: "/gallery" },
        { label: "Contact Me", link: "/contact" },
    ];

    // Theme button to control dark/light theme.
    const ThemeIcon = { dark: DarkMode, light: LightMode, system: Contrast }[themeMode];

    return (
        <AppBar
            component="header"
            enableColorOnDark
            position={isMedium && !isHome ? "relative" : "sticky"}
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
                <Size xs={<IconButton color="inherit" onClick={toggleNavOpen}><Menu /></IconButton>} md={<></>} />

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
                <Size md={<Fixed pages={pages} />} />

                {/* Theme button to control dark/light theme. */}
                <Size
                    xs={
                        <IconButton
                            color="inherit"
                            onClick={switchThemeMode}
                            sx={{ transition: "background-color 0.25s linear" }}
                        >
                            <ThemeIcon />
                        </IconButton>
                    }
                    lg={
                        <Button
                            color="inherit"
                            onClick={switchThemeMode}
                            sx={{ transition: "background-color 0.25s linear" }}
                            endIcon={<ThemeIcon />}
                            variant="outlined"
                        >
                            {`${themeMode[0]!.toUpperCase()}${themeMode.slice(1)} Mode`}
                        </Button>
                    }
                />
            </Toolbar>

            {/* The drop down nav for smaller displays. */}
            {isDropdownOpen && <Dropdown pages={pages} toggleNavOpen={toggleNavOpen} />}

            {/* The floating nav for scrolling on larger displays. */}
            <Size md={<Floating pages={pages} themeIcon={<ThemeIcon />} switchThemeMode={switchThemeMode} />} />
        </AppBar>
    );
}
