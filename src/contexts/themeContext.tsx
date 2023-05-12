"use client";
import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme, darken, lighten, responsiveFontSizes } from "@mui/material";
import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import type { Theme } from "@mui/material";
import useDarkMode from "hooks/useDarkMode";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);
const useThemeContext = (): ThemeContextType => useContext(ThemeContext);

function ThemeProvider({ children }: { children: ReactNode; }): JSX.Element {
    const [isDarkMode, toggleTheme] = useDarkMode();

    // Create the full theme.
    const theme: Theme = responsiveFontSizes(createTheme({
        palette: {
            background: {
                default: isDarkMode ? "#121212" : "#ffffff",
                paper: isDarkMode ? lighten("#121212", 0.05) : darken("#ffffff", 0.05)
            },
            mode: isDarkMode ? "dark" : "light",
            primary: { main: "#1c7eea" }
        },
        // Makes any h tags render with the main site colour.
        typography: ["h1", "h2", "h3", "h4", "h5", "h6"]
            .map((tag) => ({ [tag]: { color: "#1c7eea" } }))
            .reduce((a, b) => ({ ...a, ...b }))
    }));

    return (
        <ThemeContext.Provider value={useMemo(() => ({ theme, toggleTheme }), [isDarkMode])}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}

export { useThemeContext, ThemeProvider };
