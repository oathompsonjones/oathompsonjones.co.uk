import useLocalStorage from "./useLocalStorage";

/**
 * Uses the useLocalStorage hook to handle dark mode.
 *
 * @returns {[boolean, () => void]}
 */
export default function useDarkMode(): [boolean, () => void] {
    const [isDarkMode, setDarkMode] = useLocalStorage<boolean>("isDarkMode", true);
    return [isDarkMode, (): void => setDarkMode(!isDarkMode)];
}
