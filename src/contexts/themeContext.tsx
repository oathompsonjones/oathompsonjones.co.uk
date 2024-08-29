"use client";

import { CssBaseline, StyledEngineProvider, ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import type { Palette, Theme } from "@mui/material";
import type { ReactElement, ReactNode } from "react";

/**
 * Provides the theme to the application.
 * @param props - The properties of the component.
 * @param props.children - The children to render.
 * @returns The theme provider to wrap the application in.
 */
export function ThemeContextProvider({ children }: { children: ReactNode; }): ReactElement {
    // Create the full theme.
    const basePalette = {
        common: { black: "#121212", white: "#efefef" },
        primary: { main: "#1c7eea" },
        secondary: { main: "#ea881c" },
    };
    const theme: Theme = responsiveFontSizes(createTheme({
        colorSchemes: {
            dark: { palette: { background: { default: basePalette.common.black }, ...basePalette } },
            light: { palette: { background: { default: basePalette.common.white }, ...basePalette } },
        },
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
        cssVariables: { colorSchemeSelector: "class" },
        defaultColorScheme: "dark",
        typography: (palette: Palette) => ({
            ...Object.fromEntries(["h1", "h2", "h3", "h4", "h5", "h6"].map((key) => [key, { color: palette.primary.main }])),
            ...Object.fromEntries(["caption", "subtitle1", "subtitle2"].map((key) => [key, { color: palette.secondary.main }])),
        }),
        zIndex: { appBar: 10, fab: 10 },
    }), { breakpoints: ["xs", "sm", "md", "lg", "xl"] });

    return (
        /** Injects MUI styles before anything else. */
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
