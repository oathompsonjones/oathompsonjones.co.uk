"use client";

import { AppBar, IconButton, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import {
    Apps, Article, Collections, ContactPage,
    Contrast,
    Home, Info, Menu, Science, VideogameAsset,
} from "@mui/icons-material";
import { useContext, useState } from "react";
import { AccessibilityContext } from "contexts/accessibility";
import { Box } from "@mui/system";
import { Dropdown } from "./dropdown";
import { Floating } from "./floating";
import type { ReactNode } from "react";
import { Size } from "components/size";
import type { Theme } from "@mui/material";
import { useOutsideClick } from "hooks/useOutsideClick";

/**
 * Creates the header element.
 * @returns The page header.
 */
export function Header(): ReactNode {
    // Access the site theme.
    const { palette: { common: { white } } } = useTheme();

    // Allow user to disable transparency effect.
    const { setReduceTransparency } = useContext(AccessibilityContext);

    // Handles behaviour for changing nav bar colour and opening/closing dropdown menu.
    const isMedium = useMediaQuery((theme: Theme): string => theme.breakpoints.up("md"));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleNavOpen = (): void => setIsDropdownOpen((prev) => !prev);
    const ref = useOutsideClick(() => setIsDropdownOpen(false));

    // Associate a label and link with each page.
    const pages: Array<{ devOnly?: boolean; icon: ReactNode; label: string; link: string; }> = [
        { icon: <Home />, label: "Home", link: "/" },
        { icon: <Info />, label: "About Me", link: "/about" },
        { icon: <Apps />, label: "Portfolio", link: "/portfolio" },
        { icon: <Article />, label: "Articles", link: "/articles" },
        { icon: <VideogameAsset />, label: "Arcade", link: "/arcade" },
        { icon: <Collections />, label: "Gallery", link: "/gallery" },
        { icon: <ContactPage />, label: "Contact Me", link: "/contact" },
        { devOnly: true, icon: <Science />, label: "Test", link: "/test" },
    ].filter(({ devOnly }) => !(devOnly ?? false) || process.env.NODE_ENV === "development");

    const ContrastButton = (
        <IconButton color="inherit" onClick={() => setReduceTransparency((prev) => !prev)}>
            <Contrast />
        </IconButton>
    );

    const small = (
        <>
            <IconButton color="inherit" onClick={toggleNavOpen}>
                <Menu />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            {ContrastButton}
        </>
    );

    const large = (
        <Floating pages={pages} contrastButton={ContrastButton} />
    );

    return (
        <AppBar
            component="header"
            enableColorOnDark
            position={isMedium ? "relative" : "sticky"}
            ref={ref}
            sx={{
                background: "none",
                backgroundImage: "none",
                boxShadow: "none",
                color: white,
            }}
        >
            {/* Menu button to open/close the drop down nav. */}
            <Toolbar className="full-width">
                <Size xs={small} lg={large} />
            </Toolbar>

            {/* The drop down nav for smaller displays. */}
            {isDropdownOpen && <Dropdown pages={pages} toggleNavOpen={toggleNavOpen} />}
        </AppBar>
    );
}
