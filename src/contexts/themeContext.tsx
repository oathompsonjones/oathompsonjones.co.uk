"use client";
import {
    CssBaseline,
    ThemeProvider as MuiThemeProvider,
    StyledEngineProvider,
    createTheme,
    responsiveFontSizes
} from "@mui/material";
import type { Palette, Theme } from "@mui/material";
import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import useDarkMode from "hooks/useDarkMode";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);
const useThemeContext = (): ThemeContextType => useContext(ThemeContext);

function ThemeProvider({ children }: { readonly children: ReactNode; }): React.ReactElement {
    const [isDarkMode, toggleTheme] = useDarkMode();

    // Create the full theme.
    const theme: Theme = responsiveFontSizes(createTheme({
        components: {
            MuiButton: { defaultProps: { variant: "contained" } },
            MuiFab: { defaultProps: { color: "secondary" } },
            MuiPaper: {
                defaultProps: { elevation: 5 },
                styleOverrides: { root: { transition: "background-color 0.25s linear" } }
            }
        },
        palette: {
            background: {
                dark: "#121212",
                default: isDarkMode ? "#121212" : "#efefef",
                light: "#efefef"
            },
            mode: isDarkMode ? "dark" : "light",
            primary: { main: "#1c7eea" },
            secondary: { main: "#ea881c" }
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
            subtitle2: { color: palette.secondary.main }
        }),
        zIndex: {
            appBar: 10,
            fab: 10
        }
    }), { breakpoints: ["xs", "sm", "md", "lg", "xl"] });

    return (
        <StyledEngineProvider injectFirst>
            <ThemeContext.Provider value={useMemo(() => ({ theme, toggleTheme }), [isDarkMode])}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline enableColorScheme />
                    <style>
                        {/* CSS */`
                            html, body {
                                height: 100vh;
                                display: flex;
                                flex-direction: column;
                                scroll-behavior: smooth;
                                scroll-snap-type: y mandatory;
                            }
                            body {
                                overflow-x: hidden;
                            }
                            body, main, footer {
                                transition: background-color 0.25s linear;
                            }
                            main {
                                flex: 1;
                                padding: 4rem 1rem 1rem;
                            }
                            p, span {
                                transition: color 0.25s linear;
                            }
                            a {
                                color: #1c7eea;
                                text-decoration: none;
                                cursor: pointer;
                            }
                        `}
                    </style>
                    {children}
                </MuiThemeProvider>
            </ThemeContext.Provider>
        </StyledEngineProvider>
    );
}

export { useThemeContext, ThemeProvider };
