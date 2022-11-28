import { useCallback, useState } from "react";

/**
 * Provides the same behaviour as `useState`, but stores data using cookies instead of cache.
 *
 * @param {string} key The name of the variable to store in localStorage.
 * @param {(string | null)} initialState The initial value to store for that variable.
 * @returns {[string | null, (newValue: string | null) => void]} An array with two values. The first is the value stored, the second is a function to update that value.
 */
export const useLocalStorage = <T extends string | null = string | null>(key: string, initialState: T): [T, (newValue: T) => void] => {
    // Stores the value in the state, allowing this Hook to have the same behaviour as the useState Hook.
    const [value, setValue] = useState<T>(localStorage.getItem(key) as T | null ?? initialState);

    // Created a new function to return instead of the state setValue function.
    const updatedSetValue = useCallback((newValue: T) => {
        // Allows us to remove the cookie if the default value is assigned.
        if (newValue === initialState || typeof newValue !== "string") localStorage.removeItem(key);
        // Sets the cookie value.
        else localStorage.setItem(key, newValue);
        // Sets the state value, which triggers the rerendering behaviour of useState.
        setValue(newValue ?? initialState);
    }, [initialState, key]);

    // Returns the value and the updater function.
    return [value, updatedSetValue];
};
