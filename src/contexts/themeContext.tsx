"use client";

import {
    CssBaseline,
    ThemeProvider as MuiThemeProvider,
    StyledEngineProvider,
    createTheme,
    responsiveFontSizes,
} from "@mui/material";
import type { Palette, Theme } from "@mui/material";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import useDarkMode from "hooks/useDarkMode";
import useMousePosition from "hooks/useMousePosition";
import useWindowSize from "hooks/useWindowSize";

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);
export const useThemeContext = (): ThemeContextType => useContext(ThemeContext);

/**
 * Provides the theme to the application.
 * @param children - The children to render.
 * @returns The theme provider.
 */
export function ThemeProvider({ children }: { readonly children: ReactNode; }): ReactElement {
    const [isDarkMode, toggleTheme] = useDarkMode();

    // Create the full theme.
    const theme: Theme = responsiveFontSizes(createTheme({
        components: {
            MuiButton: {
                defaultProps: {
                    variant: "contained"
                }
            },
            MuiFab: {
                defaultProps: {
                    color: "secondary"
                }
            },
            MuiPaper: {
                defaultProps: {
                    elevation: 5
                },
                styleOverrides: {
                    root: {
                        transition: "background-color 0.25s linear"
                    }
                },
            },
        },
        palette: {
            background: {
                dark: "#121212",
                default: isDarkMode ? "#121212" : "#efefef",
                light: "#efefef",
            },
            mode: isDarkMode ? "dark" : "light",
            primary: {
                main: "#1c7eea"
            },
            secondary: {
                main: "#ea881c"
            },
        },
        typography: (palette: Palette) => {
            const primaryKeys = ["h1", "h2", "h3", "h4", "h5", "h6"];
            const primaryObj = Object.fromEntries(primaryKeys.map((key) => [key, { color: palette.primary.main }]));
            const secondaryKeys = ["caption", "subtitle1", "subtitle2"];
            const secondaryObj = Object.fromEntries(secondaryKeys.map((key) => [key, { color: palette.secondary.main }]));
            return { ...primaryObj, ...secondaryObj };
        },
        zIndex: {
            appBar: 10,
            fab: 10,
        },
    }), { breakpoints: ["xs", "sm", "md", "lg", "xl"] });

    // Create CSS variables for the mouse position.
    const { x, y } = useMousePosition();
    const { width, height } = useWindowSize();
    const hexToRGB = (hex: string): string => {
        const [r, g, b] = hex.slice(1).match(/.{2}/g)!;
        return `${parseInt(r, 16)}, ${parseInt(g!, 16)}, ${parseInt(b!, 16)}`;
    };

    return (
        <StyledEngineProvider injectFirst>
            <ThemeContext.Provider value={useMemo(() => ({ theme, toggleTheme }), [isDarkMode])}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline enableColorScheme />
                    <style>{/* CSS */`
                        :root {
                            --primary: ${hexToRGB(theme.palette.primary.main)};
                            --secondary: ${hexToRGB(theme.palette.secondary.main)};
                            --dark: ${hexToRGB(theme.palette.background.dark)};
                            --light: ${hexToRGB(theme.palette.background.light)};
                            --background: ${isDarkMode ? "var(--dark)" : "var(--light)"};
                            --mouse-x: calc(${x / width} * 100%);
                            --mouse-y: calc(${y / height} * 100%);
                        }
                    `}</style>
                    {children}
                </MuiThemeProvider>
            </ThemeContext.Provider>
        </StyledEngineProvider>
    );
}
