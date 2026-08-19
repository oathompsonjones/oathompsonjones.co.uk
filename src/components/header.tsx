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
                height: "4.5rem",
            }}
        >
            <Toolbar className="full-width">
                <BottomNavigation
                    className={className}
                    value={currentPath}
                    showLabels
                    sx={{
                        left: "50%",
                        width: "calc(100vw - 1rem)",
                        maxWidth: "max-content",
                        padding: "0 !important",
                        position: "fixed",
                        top: "1rem",
                        transform: "translateX(-50%)",
                        zIndex: 1,
                        gap: "0.5rem",
                        "& .MuiBottomNavigationAction-root": {
                            minWidth: "5rem",
                            padding: "0.5rem 0.75rem",
                            "@media (max-width: 900px)": {
                                minWidth: "4rem",
                                padding: "0.5rem 0.5rem",
                            },
                            "@media (max-width: 700px)": {
                                minWidth: "3.25rem",
                                padding: "0.4rem 0.25rem",
                                "& .MuiBottomNavigationAction-label": {
                                    fontSize: "0.65rem",
                                },
                                "& .MuiSvgIcon-root": {
                                    fontSize: "1.25rem",
                                },
                            },
                            "@media (max-width: 500px)": {
                                minWidth: "2.75rem",
                                padding: "0.35rem 0.1rem",
                                "& .MuiBottomNavigationAction-label": {
                                    fontSize: "0.55rem",
                                },
                                "& .MuiSvgIcon-root": {
                                    fontSize: "1.1rem",
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
