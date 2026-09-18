"use client";

import { AppBar, BottomNavigation, BottomNavigationAction, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { Apps, Article, Collections, ContactPage, Contrast, Home } from "@mui/icons-material";
import { Info, Science, VideogameAsset } from "@mui/icons-material";
import { type MouseEventHandler, type ReactNode, useContext } from "react";
import { AccessibilityContext } from "contexts/accessibility";
import { useGlass } from "hooks/useGlass";
import { usePathname } from "next/navigation";

/**
 * Creates the header element.
 * @returns The page header.
 */
export function Header(): ReactNode {
    const { palette: { common: { white } } } = useTheme();
    const className = useGlass();
    const currentPath = usePathname();
    const { setReduceTransparency } = useContext(AccessibilityContext);
    const isMobile = useMediaQuery("(max-width: 700px)");
    const navigationActionStyles = Object.fromEntries([
        [
            "& .MuiBottomNavigationAction-root", {
                flex: { md: "0 1 auto", xs: "1 1 0" },
                minWidth: { lg: "5rem", md: "4rem", xs: 0 },
                padding: { lg: "0.5rem 0.75rem", md: "0.5rem 0.5rem", sm: "0.4rem 0.15rem", xs: "0.35rem 0.05rem" },
            },
        ],
        ["& .MuiBottomNavigationAction-label", { fontSize: { md: "0.75rem", sm: "0.65rem", xs: "0.55rem" } }],
        ["& .MuiSvgIcon-root", { fontSize: { md: "1.5rem", sm: "1.25rem", xs: "1.1rem" } }],
    ]);
    const hoverStyles = Object.fromEntries([["&:hover", { backgroundColor: "rgba(255, 255, 255, 0.1)" }]]);

    const nbsp = "\u00A0";
    const pages: Array<{
        devOnly?: boolean;
        icon: ReactNode;
        label?: string;
        link?: string;
        handleClick?: MouseEventHandler;
    }> = [
        { icon: <Home />, label: "Home", link: "/" },
        { icon: <Info />, label: `About${nbsp}Me`, link: "/about" },
        { icon: <Apps />, label: "Portfolio", link: "/portfolio" },
        { icon: <Article />, label: "Articles", link: "/articles" },
        { icon: <VideogameAsset />, label: "Arcade", link: "/arcade" },
        { icon: <Collections />, label: "Gallery", link: "/gallery" },
        { icon: <ContactPage />, label: `Contact${nbsp}Me`, link: "/contact" },
        { devOnly: true, icon: <Science />, label: "Test", link: "/test" },
        { handleClick: () => setReduceTransparency((previous) => !previous), icon: <Contrast /> },
    ].filter(({ devOnly = false }) => !devOnly || process.env.NODE_ENV === "development");

    return (
        <AppBar
            component="header"
            enableColorOnDark
            position="sticky"
            sx={{
                background: "none",
                backgroundImage: "none",
                boxShadow: "none",
                color: white,
                height: { md: "4.5rem", sm: "3.75rem", xs: "3.25rem" },
            }}
        >
            <Toolbar className="full-width">
                <BottomNavigation
                    className={className}
                    showLabels
                    sx={{
                        ...navigationActionStyles,
                        gap: {
                            md: "0.5rem",
                            sm: "0.15rem",
                            xs: 0,
                        },
                        height: { md: 56, xs: "auto" },
                        left: { md: "0.5rem", sm: "0.75rem", xs: "0.5rem" },
                        margin: "0 auto",
                        maxWidth: {
                            md: "max-content",
                            sm: "none",
                            xs: "none",
                        },
                        padding: "0 !important",
                        position: "fixed",
                        right: { md: "0.5rem", sm: "0.75rem", xs: "0.5rem" },
                        top: {
                            md: "1rem",
                            sm: "0.75rem",
                            xs: "0.6rem",
                        },
                        zIndex: 1,
                    }}
                    value={currentPath}
                >
                    {pages.map((page, i) => (
                        <BottomNavigationAction
                            href={page.link ?? ""}
                            icon={page.icon}
                            key={i}
                            label={isMobile ? undefined : page.label}
                            onClick={page.handleClick}
                            sx={{
                                ...hoverStyles,
                                borderRadius: "100vh",
                                transition: "background-color 0.3s ease-in-out",
                            }}
                            value={page.link}
                        />
                    ))}
                </BottomNavigation>
            </Toolbar>
        </AppBar>
    );
}
