"use client";

import { CssBaseline, StyledEngineProvider, ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import DefaultPropsProvider from "@mui/material/DefaultPropsProvider";
import type { ReactNode } from "react";

/**
 * Provides the theme to the application.
 * @param props - The properties of the component.
 * @param props.children - The children to render.
 * @returns The theme provider to wrap the application in.
 */
export function ThemeContextProvider({ children }: { children: ReactNode; }): ReactNode {
    // Create the full theme.
    const basePalette = {
        common: { black: "#121212", white: "#efefef" },
        primary: { main: "#1c7eea" },
        secondary: { main: "#ea881c" },
    };
    const theme = responsiveFontSizes(createTheme({
        colorSchemes: {
            dark: { palette: { background: { default: basePalette.common.black }, ...basePalette } },
            light: { palette: { background: { default: basePalette.common.white }, ...basePalette } },
        },
        components: {
            MuiButton: { styleOverrides: { root: { borderRadius: "2vmin" } } },
            MuiContainer: { styleOverrides: { root: { padding: "0" } } },
            MuiDivider: { styleOverrides: { root: { margin: "1.25% 0" } } },
            MuiMenuItem: { styleOverrides: { root: { borderRadius: "2vmin" } } },
            MuiPaper: {
                styleOverrides: {
                    root: { transition: "background-color 0.25s linear" },
                    rounded: { borderRadius: "2vmin" },
                },
            },
            MuiSkeleton: { styleOverrides: { root: { borderRadius: "2vmin" } } },
        },
        cssVariables: { colorSchemeSelector: "class" },
        defaultColorScheme: "dark",
        typography: (palette) => ({
            ...Object.fromEntries(["h1", "h2", "h3", "h4", "h5", "h6"]
                .map((key) => [key, { color: palette.primary.main }])),
            ...Object.fromEntries(["caption", "subtitle1", "subtitle2"]
                .map((key) => [key, { color: palette.secondary.main }])),
        }),
        zIndex: { appBar: 10, fab: 10 },
    }), { breakpoints: ["xs", "sm", "md", "lg", "xl"] });

    return (
        /** Injects MUI styles before anything else. */
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <DefaultPropsProvider value={{
                    MuiButton: { variant: "contained" },
                    MuiDivider: { variant: "middle" },
                    MuiFab: { color: "secondary" },
                    MuiPaper: { elevation: 5 },
                    MuiTextField: { fullWidth: true, required: true, variant: "filled" },
                }}>
                    <CssBaseline enableColorScheme />
                    {children}
                </DefaultPropsProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
