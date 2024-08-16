"use client";

import { AppBar, IconButton, Toolbar, useMediaQuery, useScrollTrigger } from "@mui/material";
import { DarkMode, LightMode, Menu } from "@mui/icons-material";
import { useEffect, useState } from "react";
import LargeNav from "./large";
import type { ReactElement } from "react";
import SmallNav from "./small";
import Title from "./title";
import useOutsideClick from "hooks/useOutsideClick";
import { usePathname } from "next/navigation";
import { useThemeContext } from "contexts/themeContext";

/**
 * Creates the header element.
 * @returns The page header.
 */
export default function Header(): ReactElement {
    // Access the site theme.
    const { theme, toggleTheme } = useThemeContext();
    const { palette: { background: { dark, light }, mode } } = theme;

    // Handles behaviour for changing nav bar colour and opening/closing dropdown menu.
    const isScrolling: boolean = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
    const isMobile: boolean = useMediaQuery(theme.breakpoints.down("md"));
    const isHomePage: boolean = usePathname() === "/";
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleNavOpen = (): void => setIsNavOpen(() => isMobile && !isNavOpen);
    const ref = useOutsideClick(() => setIsNavOpen(false));

    useEffect(() => setIsNavOpen(false), []);

    const textColour = { dark: light, light: dark }[isHomePage ? "dark" : mode];
    const solidBackground = isNavOpen || isScrolling && (isMobile || !isHomePage);

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
            position="fixed"
            ref={ref}
            sx={{
                ...solidBackground
                    ? {}
                    : {
                        background: "none",
                        boxShadow: "none",
                        color: textColour,
                    },
                backgroundImage: "none",
            }}
        >
            {/* Toolbar is essential for properly aligning elements within the AppBar. */}
            <Toolbar>
                <IconButton color="inherit" onClick={toggleNavOpen} sx={{ display: { md: "none" } }}>
                    <Menu />
                </IconButton>
                <Title textColour={solidBackground ? light : textColour} />
                <LargeNav pages={pages} />
                {/* Renders a button to control dark/light theme. This renders on displays of any size. */}
                <IconButton color="inherit" onClick={toggleTheme}>
                    {mode === "dark" ? <DarkMode /> : <LightMode />}
                </IconButton>
            </Toolbar>
            <SmallNav isOpen={isNavOpen} pages={pages} toggleNavOpen={toggleNavOpen} />
        </AppBar>
    );
}
