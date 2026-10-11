"use client";

import { AppBar, BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { Apps, Article, Collections, ContactPage, Contrast, Home } from "@mui/icons-material";
import { IconButton, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { Info, Science, VideogameAsset } from "@mui/icons-material";
import { useCallback, useContext } from "react";
import { AccessibilityContext } from "contexts/accessibility";
import type { ReactNode } from "react";
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
    const toggleTransparency = useCallback(
        () => setReduceTransparency((previous) => !previous),
        [setReduceTransparency],
    );
    const isMobile = useMediaQuery("(max-width: 700px)");
    const size = isMobile ? 42 : 56;
    const iconStyles = { fontSize: { md: "1.5rem", sm: "1.25rem", xs: "1.1rem" } };
    // Without labels, each action is a square that shrinks evenly, so its hover shape stays circular.
    const iconOnlyActionStyles = {
        alignSelf: "center",
        aspectRatio: "1",
        flex: "1 1 0",
        height: "auto",
        maxWidth: size,
        minWidth: 0,
        padding: 0,
    };
    const iconSelector = Object.fromEntries<object>([["& .MuiSvgIcon-root", iconStyles]]);
    const navigationActionStyles = Object.fromEntries<object>([
        [
            "& .MuiBottomNavigationAction-root", isMobile
                ? iconOnlyActionStyles
                : {
                    flex: { md: "0 1 auto", xs: "1 1 0" },
                    minWidth: { lg: "5rem", md: "4rem", xs: 0 },
                    padding: { lg: "0.5rem 0.75rem", md: "0.5rem 0.5rem", sm: "0.4rem 0.15rem", xs: "0.35rem 0.05rem" },
                },
        ],
        ["& .MuiBottomNavigationAction-label", { fontSize: { md: "0.75rem", sm: "0.65rem", xs: "0.55rem" } }],
        ["& .MuiSvgIcon-root", iconStyles],
    ]);
    const offset = { md: "0.5rem", sm: "0.75rem", xs: "0.5rem" };
    const hoverStyles = Object.fromEntries([["&:hover", { backgroundColor: "rgba(255, 255, 255, 0.1)" }]]);

    const pages: Array<{ devOnly?: boolean;icon: ReactNode;label: string;link: string; }> = [
        { icon: <Home />, label: "Home", link: "/" },
        { icon: <Info />, label: "About Me", link: "/about" },
        { icon: <Apps />, label: "Portfolio", link: "/portfolio" },
        { icon: <Article />, label: "Articles", link: "/articles" },
        { icon: <VideogameAsset />, label: "Arcade", link: "/arcade" },
        { icon: <Collections />, label: "Gallery", link: "/gallery" },
        { icon: <ContactPage />, label: "Contact Me", link: "/contact" },
        { devOnly: true, icon: <Science />, label: "Test", link: "/test" },
    ]
        .filter(({ devOnly = false }) => !devOnly || process.env.NODE_ENV === "development")
        .map(({ label, ...rest }) => ({ label: label.replace(/\s/g, "\u00A0"), ...rest }));

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
                <Box
                    sx={{
                        alignItems: "stretch",
                        display: "flex",
                        gap: { md: "1rem", sm: "0.75rem", xs: "0.5rem" },
                        justifyContent: "center",
                        left: offset,
                        position: "fixed",
                        right: offset,
                        top: { md: "1rem", sm: "0.75rem", xs: "0.6rem" },
                        zIndex: 1,
                    }}
                >
                    <BottomNavigation
                        className={className}
                        showLabels
                        sx={{
                            ...navigationActionStyles,
                            flex: { md: "0 1 auto", xs: "1 1 0" },
                            gap: { md: "0.5rem", sm: "0.15rem", xs: 0 },
                            height: size,
                            justifyContent: isMobile ? "space-evenly" : undefined,
                            maxWidth: { md: "max-content", sm: "none", xs: "none" },
                            minWidth: 0,
                            padding: isMobile ? "0 0.25rem !important" : "0 !important",
                        }}
                        value={currentPath}
                    >
                        {pages.map((page, i) => (
                            <BottomNavigationAction
                                href={page.link}
                                icon={page.icon}
                                key={i}
                                label={isMobile ? undefined : page.label}
                                sx={{
                                    ...hoverStyles,
                                    borderRadius: "100vh",
                                    transition: "background-color 0.3s ease-in-out",
                                }}
                                value={page.link}
                            />
                        ))}
                    </BottomNavigation>
                    <Box
                        className={className}
                        sx={{
                            alignItems: "center",
                            backgroundColor: "background.paper",
                            display: "flex",
                            flexShrink: 0,
                            height: size,
                            justifyContent: "center",
                            padding: "0 !important",
                            width: size,
                        }}
                    >
                        <IconButton
                            aria-label="Toggle transparency"
                            color="inherit"
                            onClick={toggleTransparency}
                            sx={{ ...hoverStyles, ...iconSelector, height: "100%", width: "100%" }}
                        >
                            <Contrast />
                        </IconButton>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
