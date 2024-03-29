import useLocalStorage from "./useLocalStorage";

/**
 * Uses the useLocalStorage hook to handle dark mode.
 * @returns Whether or not dark mode is enabled, and a function to toggle it.
 */
export default function useDarkMode(): [boolean, () => void] {
    const [isDarkMode, setDarkMode] = useLocalStorage<boolean>("isDarkMode", true);

    return [isDarkMode, (): void => setDarkMode(!isDarkMode)];
}
