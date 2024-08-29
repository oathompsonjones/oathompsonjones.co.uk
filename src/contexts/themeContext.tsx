"use client";

import { CssBaseline, ThemeProvider as MuiProvider, StyledEngineProvider, createTheme, responsiveFontSizes } from "@mui/material";
import type { Palette, Theme } from "@mui/material";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { useDarkMode } from "hooks/useDarkMode";

declare module "@mui/material/styles" {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface TypeBackground {
        dark: string;
        light: string;
    }
}

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const useThemeContext = (): ThemeContextType => useContext(ThemeContext);

/**
 * Provides the theme to the application.
 * @param props - The properties of the component.
 * @param props.children - The children to render.
 * @returns The theme provider to wrap the application in.
 */
export function ThemeProvider({ children }: { children: ReactNode; }): ReactElement {
    const [isDarkMode, toggleTheme] = useDarkMode();

    // Create the full theme.
    const colours = {
        dark: "#121212",
        light: "#efefef",
        primary: "#1c7eea",
        secondary: "#ea881c",
    };
    const theme: Theme = responsiveFontSizes(createTheme({
        components: {
            MuiButton: { defaultProps: { variant: "contained" } },
            MuiDivider: {
                defaultProps: { variant: "middle" },
                styleOverrides: { root: { marginBottom: "1.25%", marginTop: "1.25%" } },
            },
            MuiFab: { defaultProps: { color: "secondary" } },
            MuiPaper: {
                defaultProps: { elevation: 5 },
                styleOverrides: { root: { transition: "background-color 0.25s linear" } },
            },
        },
        cssVariables: true,
        palette: {
            background: { dark: colours.dark, light: colours.light },
            mode: isDarkMode ? "dark" : "light",
            primary: { main: colours.primary },
            secondary: { main: colours.secondary },
        },
        typography: (palette: Palette) => ({
            ...Object.fromEntries(["h1", "h2", "h3", "h4", "h5", "h6"].map((key) => [key, { color: palette.primary.main }])),
            ...Object.fromEntries(["caption", "subtitle1", "subtitle2"].map((key) => [key, { color: palette.secondary.main }])),
        }),
        zIndex: { appBar: 10, fab: 10 },
    }), { breakpoints: ["xs", "sm", "md", "lg", "xl"] });

    return (
        // Injects MUI styles before anything else.
        <StyledEngineProvider injectFirst>
            <ThemeContext.Provider value={useMemo(() => ({ theme, toggleTheme }), [isDarkMode])}>
                <MuiProvider theme={theme}>
                    <CssBaseline enableColorScheme />
                    {children}
                </MuiProvider>
            </ThemeContext.Provider>
        </StyledEngineProvider>
    );
}
