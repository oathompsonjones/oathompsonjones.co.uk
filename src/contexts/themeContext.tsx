"use client";

import {
    CssBaseline,
    ThemeProvider as MuiThemeProvider,
    StyledEngineProvider,
    createTheme,
    responsiveFontSizes,
    useMediaQuery,
} from "@mui/material";
import type { Palette, Theme } from "@mui/material";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import useDarkMode from "hooks/useDarkMode";

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
            MuiButton: { defaultProps: { variant: "contained" } },
            MuiFab: { defaultProps: { color: "secondary" } },
            MuiPaper: {
                defaultProps: { elevation: 5 },
                styleOverrides: { root: { transition: "background-color 0.25s linear" } },
            },
        },
        palette: {
            background: {
                dark: "#121212",
                default: isDarkMode ? "#121212" : "#efefef",
                light: "#efefef",
            },
            mode: isDarkMode ? "dark" : "light",
            primary: { main: "#1c7eea" },
            secondary: { main: "#ea881c" },
        },
        typography: (palette: Palette) => ({
            caption: { color: palette.secondary.main },
            h1: { color: palette.primary.main },
            h2: { color: palette.primary.main },
            h3: { color: palette.primary.main },
            h4: { color: palette.primary.main },
            h5: { color: palette.primary.main },
            h6: { color: palette.primary.main },
            subtitle1: { color: palette.secondary.main },
            subtitle2: { color: palette.secondary.main },
        }),
        zIndex: {
            appBar: 10,
            fab: 10,
        },
    }), { breakpoints: ["xs", "sm", "md", "lg", "xl"] });

    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <StyledEngineProvider injectFirst>
            <ThemeContext.Provider value={useMemo(() => ({ theme, toggleTheme }), [isDarkMode])}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline enableColorScheme />
                    <style>{/* CSS */`
                        html, body {
                            min-height: 100dvh;
                            display: flex;
                            flex-direction: column;
                            scroll-behavior: smooth;
                            scroll-snap-type: ${isMobile ? "none" : "y mandatory"};
                        }
                        body {
                            overflow-x: hidden;
                        }
                        body, main, footer {
                            transition: background-color 0.25s linear;
                        }
                        main {
                            flex: 1;
                            padding: 4rem 3rem 1rem;
                        }
                        p, span {
                            transition: color 0.25s linear;
                        }
                        a {
                            color: ${theme.palette.primary.main};
                            text-decoration: none;
                            cursor: pointer;
                        }
                    `}</style>
                    {children}
                </MuiThemeProvider>
            </ThemeContext.Provider>
        </StyledEngineProvider>
    );
}
