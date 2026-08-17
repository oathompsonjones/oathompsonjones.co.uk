"use client";

import type { ReactNode } from "react";
import {
    CssBaseline, StyledEngineProvider, ThemeProvider,
    createTheme, responsiveFontSizes, useTheme as useMuiTheme,
} from "@mui/material";
import DefaultPropsProvider from "@mui/material/DefaultPropsProvider";
import type { Theme } from "@mui/material";
import { Tartan, colours } from "components/tartan";

export const useTheme = (): Theme => useMuiTheme<Theme>();

/**
 * Provides the theme to the application.
 * @param props - The properties of the component.
 * @param props.children - The children to render.
 * @returns The theme provider to wrap the application in.
 */
export function ThemeContextProvider({ children }: { children: ReactNode; }): ReactNode {
    const colorSchemes = {
        dark: {
            palette: {
                background: {
                    default: colours.cream,
                    paper: colours.grey,
                },
                common: {
                    black: colours.black,
                    white: colours.cream,
                },
                divider: colours.cream,
                primary: { main: colours.cream },
                secondary: { main: colours.maroon },
            },
        },
    };
    const theme = responsiveFontSizes(createTheme({
        colorSchemes,
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        backgroundColor: colorSchemes.dark.palette.secondary.main,
                        borderRadius: "100vh",
                        color: colorSchemes.dark.palette.common.white,
                    }
                }
            },
            MuiContainer: { styleOverrides: { root: { padding: "0" } } },
            MuiDivider: { styleOverrides: { root: { margin: "1.25% 0" } } },
            MuiInputBase: { styleOverrides: { root: { borderRadius: "1rem 1rem 0 0 !important" } } },
            MuiMenuItem: { styleOverrides: { root: { borderRadius: "100vh" } } },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        background: "none",
                        backgroundColor: colorSchemes.dark.palette.background.paper,
                        transition: "background-color 0.25s linear",
                    },
                    rounded: { borderRadius: "2rem" },
                },
            },
            MuiSkeleton: { styleOverrides: { root: { borderRadius: "2rem" } } },
        },
        cssVariables: { colorSchemeSelector: "class" },
        defaultColorScheme: "dark",
        typography: (palette) => ({
            ...Object.fromEntries(["h1", "h2", "h3", "h4", "h5", "h6"]
                .map((key) => [key, { color: palette.primary.main }])),
            ...Object.fromEntries(["caption", "subtitle1", "subtitle2"]
                .map((key) => [key, { color: palette.text.secondary }])),
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
                    MuiFab: { color: "primary" },
                    MuiPaper: { elevation: 5 },
                    MuiTextField: { fullWidth: true, required: true, variant: "filled" },
                }}>
                    <CssBaseline enableColorScheme />
                    <Tartan />
                    {children}
                </DefaultPropsProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
