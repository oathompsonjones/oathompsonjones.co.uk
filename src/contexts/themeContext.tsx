"use client";
import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme, darken, lighten, responsiveFontSizes } from "@mui/material";
import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import type { Theme } from "@mui/material";
import useDarkMode from "hooks/useDarkMode";

interface ThemeContextType {
    colours: {
        dark: string;
        light: string;
        main: string;
    };
    theme: Theme;
    toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);
const useThemeContext = (): ThemeContextType => useContext(ThemeContext);

function ThemeProvider({ children }: { children: ReactNode; }): JSX.Element {
    const [isDarkMode, toggleTheme] = useDarkMode();

    // Create the full theme.
    const colours = {
        dark: "#121212",
        light: "#ffffff",
        main: "#1c7eea"
    };
    const theme: Theme = responsiveFontSizes(createTheme({
        palette: {
            background: {
                default: isDarkMode ? colours.dark : colours.light,
                paper: isDarkMode ? lighten(colours.dark, 0.05) : darken(colours.light, 0.05)
            },
            mode: isDarkMode ? "dark" : "light",
            primary: { main: colours.main }
        },
        // Makes any h tags render with the main site colour.
        typography: Object.fromEntries(["h1", "h2", "h3", "h4", "h5", "h6"].map((h) => [h, { color: colours.main }]))
    }));

    return (
        <ThemeContext.Provider value={useMemo(() => ({ colours, theme, toggleTheme }), [isDarkMode])}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}

export { useThemeContext, ThemeProvider };
