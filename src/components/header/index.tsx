"use client";

import { AppBar, IconButton, Toolbar, Tooltip, useMediaQuery, useScrollTrigger, useTheme } from "@mui/material";
import { Contrast, DarkMode, LightMode, Menu } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { LargeNav } from "./large";
import type { ReactElement } from "react";
import { SmallNav } from "./small";
import type { Theme } from "@mui/material";
import { Title } from "./title";
import { useOutsideClick } from "hooks/useOutsideClick";
import { usePathname } from "next/navigation";
import { useThemeMode } from "hooks/useThemeMode";

/**
 * Creates the header element.
 * @returns The page header.
 */
export function Header(): ReactElement {
    // Access the site theme.
    const { switchThemeMode, themeColour, themeMode } = useThemeMode();
    const { palette: { common: { black, white } } } = useTheme();

    // Handles behaviour for changing nav bar colour and opening/closing dropdown menu.
    const isScrolling: boolean = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
    const isMobile: boolean = useMediaQuery((theme: Theme): string => theme.breakpoints.down("md"));
    const isHomePage: boolean = usePathname() === "/";
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleNavOpen = (): void => setIsNavOpen(() => isMobile && !isNavOpen);
    const ref = useOutsideClick(() => setIsNavOpen(false));

    useEffect(() => setIsNavOpen(false), []);

    const solidBackground = isNavOpen || isScrolling && (isMobile || !isHomePage);
    const textColour = solidBackground ? white : { dark: white, light: black }[isHomePage ? "dark" : themeColour];

    // Associate a label and link with each page.
    const pages: Array<{ label: string; link: string; }> = [
        { label: "Home", link: "/" },
        { label: "About Me", link: "/about" },
        { label: "Portfolio", link: "/portfolio" },
        { label: "Gallery", link: "/gallery" },
        { label: "Contact Me", link: "/contact" },
    ];

    // Mode switcher button.
    const switchThemeButton = {
        dark: <DarkMode />,
        light: <LightMode />,
        system: <Contrast />,
    }[themeMode];

    return (
        <AppBar
            component="header"
            enableColorOnDark
            position="fixed"
            ref={ref}
            sx={{ ...solidBackground ? {} : { background: "none", boxShadow: "none", color: textColour }, backgroundImage: "none" }}
        >
            {/* Toolbar is essential for properly aligning elements within the AppBar. */}
            <Toolbar>
                <IconButton color="inherit" onClick={toggleNavOpen} sx={{ display: { md: "none" } }}>
                    <Menu />
                </IconButton>
                <Title />
                <LargeNav pages={pages} />
                {/* Renders a button to control dark/light theme. This renders on displays of any size. */}
                <Tooltip title={`${themeMode[0]!.toUpperCase()}${themeMode.slice(1)} Mode`} arrow>
                    <IconButton color="inherit" onClick={switchThemeMode} sx={{ transition: "background-color 0.25s linear" }}>
                        {switchThemeButton}
                    </IconButton>
                </Tooltip>
            </Toolbar>
            <SmallNav isOpen={isNavOpen} pages={pages} toggleNavOpen={toggleNavOpen} />
        </AppBar>
    );
}
