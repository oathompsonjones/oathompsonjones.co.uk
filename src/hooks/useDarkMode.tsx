import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useMediaQuery } from "@mui/material";

/**
 * Uses the useLocalStorage hook to handle dark mode.
 * @returns Whether or not dark mode is enabled, and a function to toggle it.
 */
export function useDarkMode(): [boolean, () => void] {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [isDarkMode, setDarkMode] = useLocalStorage<boolean>("isDarkMode", true);

    useEffect(() => setDarkMode(prefersDarkMode), [prefersDarkMode]);

    return [isDarkMode, (): void => setDarkMode(!isDarkMode)];
}
