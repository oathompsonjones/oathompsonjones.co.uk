import { useCallback, useState } from "react";

// Type StringLike = string;

export const useLocalStorage = <T extends string | null = string | null>(key: string, initialState: T): [T, (newValue: T) => void] => {
    const [value, setValue] = useState<T>(localStorage.getItem(key) as T | null ?? initialState);
    const updatedSetValue = useCallback((newValue: T) => {
        if (newValue === initialState || typeof newValue !== "string") localStorage.removeItem(key);
        else localStorage.setItem(key, newValue);
        setValue(newValue ?? initialState);
    }, [initialState, key]);
    return [value, updatedSetValue];
};
