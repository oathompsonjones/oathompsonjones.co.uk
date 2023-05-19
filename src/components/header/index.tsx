"use client";
import { AppBar, IconButton, Toolbar, useMediaQuery, useScrollTrigger } from "@mui/material";
import { DarkMode, LightMode, Menu } from "@mui/icons-material";
import { useEffect, useState } from "react";
import LargeHeader from "./large";
import SmallNav from "./small";
import Title from "./title";
import { usePathname } from "next/navigation";
import { useThemeContext } from "contexts/themeContext";

/**
 * Creates the header element.
 *
 * @returns {JSX.Element} The page header.
 */
export default function Header(): JSX.Element {
    // Access the site theme.
    const { theme, toggleTheme } = useThemeContext();
    const { palette: { background: { dark, light }, mode, primary: { main } } } = theme;

    // Handles behaviour for changing nav bar colour and opening/closing dropdown menu.
    const scrolling: boolean = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
    const smallNav: boolean = useMediaQuery(theme.breakpoints.down("md"));
    const [navOpen, setNavOpen] = useState(false);
    const toggleNavOpen = (): void => setNavOpen(() => smallNav && !navOpen);
    useEffect(() => setNavOpen(false), [smallNav]);
    const pathname = usePathname();
    const textColour = { dark: light, light: dark }[pathname === "/" ? "dark" : mode];
    const solidBackground = scrolling || smallNav && navOpen;

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
            position="fixed"
            sx={{
                background: solidBackground ? null : "none",
                backgroundImage: "none",
                boxShadow: solidBackground ? null : "none",
                color: solidBackground ? null : textColour
            }}
        >
            {/* Toolbar is essential for properly aligning elements within the AppBar. */}
            <Toolbar>
                <IconButton color="inherit" onClick={toggleNavOpen} sx={{ display: { md: "none", xs: "block" }, height: "40px" }}>
                    <Menu />
                </IconButton>
                <Title textColour={solidBackground ? light : textColour} />
                <LargeHeader pages={pages} />
                {/* Renders a button to control dark/light theme. This renders on displays of any size. */}
                <IconButton color="inherit" onClick={toggleTheme}>
                    {mode === "dark" ? <DarkMode /> : <LightMode />}
                </IconButton>
            </Toolbar>
            {navOpen ? <SmallNav backgroundColor={main} pages={pages} toggleNavOpen={toggleNavOpen} /> : null}
        </AppBar>
    );
}
