"use client";

import { AppBar, BottomNavigation, BottomNavigationAction, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { Apps, Article, Collections, ContactPage, Contrast, Home, Info, Science, VideogameAsset } from "@mui/icons-material";
import { MouseEventHandler, useContext, type ReactNode } from "react";
import { useGlass } from "hooks/useGlass";
import { usePathname } from "next/navigation";
import { AccessibilityContext } from "contexts/accessibility";

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

    const nbsp = "\u00A0";
    const pages: Array<{ 
        devOnly?: boolean; 
        icon: ReactNode; 
        label?: string; 
        link?: string; 
        onClick?: MouseEventHandler;
    }> = [
        { icon: <Home />, label: "Home", link: "/" },
        { icon: <Info />, label: `About${nbsp}Me`, link: "/about" },
        { icon: <Apps />, label: "Portfolio", link: "/portfolio" },
        { icon: <Article />, label: "Articles", link: "/articles" },
        { icon: <VideogameAsset />, label: "Arcade", link: "/arcade" },
        { icon: <Collections />, label: "Gallery", link: "/gallery" },
        { icon: <ContactPage />, label: `Contact${nbsp}Me`, link: "/contact" },
        { devOnly: true, icon: <Science />, label: "Test", link: "/test" },
        { icon: <Contrast />, onClick: () => setReduceTransparency((prev) => !prev)}
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
                height: {
                    xs: "3.25rem",
                    sm: "3.75rem",
                    md: "4.5rem",
                },
            }}
        >
            <Toolbar className="full-width">
                <BottomNavigation
                    className={className}
                    value={currentPath}
                    showLabels
                    sx={{
                        left: {
                            xs: "0.5rem",
                            sm: "0.75rem",
                            md: "0.5rem",
                        },
                        right: {
                            xs: "0.5rem",
                            sm: "0.75rem",
                            md: "0.5rem",
                        },
                        margin: "0 auto",
                        padding: "0 !important",
                        position: "fixed",
                        top: {
                            xs: "0.6rem",
                            sm: "0.75rem",
                            md: "1rem",
                        },
                        height: {
                            xs: "auto",
                            md: 56,
                        },
                        zIndex: 1,
                        maxWidth: {
                            xs: "none",
                            sm: "none",
                            md: "max-content",
                        },
                        gap: {
                            xs: 0,
                            sm: "0.15rem",
                            md: "0.5rem",
                        },
                        "& .MuiBottomNavigationAction-root": {
                            minWidth: {
                                xs: 0,
                                md: "4rem",
                                lg: "5rem",
                            },
                            flex: {
                                xs: "1 1 0",
                                md: "0 1 auto",
                            },
                            padding: {
                                xs: "0.35rem 0.05rem",
                                sm: "0.4rem 0.15rem",
                                md: "0.5rem 0.5rem",
                                lg: "0.5rem 0.75rem",
                            },
                            "& .MuiBottomNavigationAction-label": {
                                fontSize: {
                                    xs: "0.55rem",
                                    sm: "0.65rem",
                                    md: "0.75rem",
                                },
                            },
                            "& .MuiSvgIcon-root": {
                                fontSize: {
                                    xs: "1.1rem",
                                    sm: "1.25rem",
                                    md: "1.5rem",
                                },
                            },
                        },
                    }}>
                    {pages.map((page, i) => (
                        <BottomNavigationAction
                            key={i}
                            value={page.link}
                            href={page.link ?? ""}
                            label={isMobile ? undefined : page.label}
                            icon={page.icon}
                            onClick={page.onClick}
                            sx={{
                                // eslint-disable-next-line @typescript-eslint/naming-convention
                                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                                borderRadius: "100vh",
                                transition: "background-color 0.3s ease-in-out",
                            }}
                        />
                    ))}
                </BottomNavigation>
            </Toolbar>
        </AppBar>
    );
}
