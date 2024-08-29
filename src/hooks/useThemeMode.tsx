"use client";

import { useColorScheme, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import type { Theme } from "@mui/material";

type ThemeColour = "dark" | "light";

type ThemeMode = ThemeColour | "system";

/**
 * Uses the useLocalStorage hook to handle dark mode.
 * @returns Whether or not dark mode is enabled, and a function to toggle it.
 */
export function useThemeMode(): { switchThemeMode: () => void; theme: Theme; themeColour: ThemeColour; themeMode: ThemeMode; } {
    const theme = useTheme();
    const { mode, systemMode, setMode } = useColorScheme();
    const [themeColour, setThemeColour] = useState<ThemeColour>((mode === "system" ? systemMode : mode) ?? "dark");
    const getPreferredMode = (): ThemeColour => (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    // If the system mode is changed while the theme mode is set to system, update the theme colour.
    useEffect(() => {
        if (mode === "system")
            setThemeColour(getPreferredMode());
    }, [systemMode]);

    /** Updates the theme mode and colour. */
    function switchThemeMode(): void {
        const nextMode: Record<ThemeMode, ThemeMode> = { dark: "light", light: "system", system: "dark" };
        const newMode = nextMode[mode ?? "system"];

        setThemeColour(newMode === "system" ? getPreferredMode() : newMode);
        setMode(newMode);
    }

    return { switchThemeMode, theme, themeColour, themeMode: mode ?? "system" };
}
