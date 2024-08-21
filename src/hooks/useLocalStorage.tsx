"use client";

import { useEffect, useState } from "react";

/**
 * Parses a string into a JSON object.
 * @template T - The type of the value to parse.
 * @param value - The value to parse.
 * @param fallbackValue - The value to return if the parsing fails.
 * @returns The parsed value or the fallback value.
 */
function parse<T>(value: string, fallbackValue: T): T {
    try {
        return JSON.parse(value) as T;
    } catch {
        return fallbackValue;
    }
}

/**
 * Provides the same behaviour as `useState`, but also stores data using localStorage.
 * @template T - The type of the value to store.
 * @param key - The name of the variable to store in localStorage.
 * @param initialState - The initial value to store for that variable.
 * The first is the value stored, the second is a function to update that value.
 * @returns The value stored in localStorage, and a function to update that value.
 */
export function useLocalStorage<T>(key: string, initialState: T): [T, (newValue: T) => void] {
    // Stores the value in the state, allowing this Hook to have the same behaviour as the useState Hook.
    const [value, setValue] = useState<T>(initialState);

    // Stores the state in local storage once mounted.
    useEffect(() => {
        const item = localStorage.getItem(key);

        if (item !== null)
            setValue(parse<T>(item, initialState));
    }, []);

    // Updates the local storage when the state updates.
    useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [value]);

    // Returns the value and the updater function.
    return [value, setValue];
}
