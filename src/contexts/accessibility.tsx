"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useEffect, useState } from "react";

export const AccessibilityContext = createContext<{
    reduceTransparency: boolean;
    setReduceTransparency: Dispatch<SetStateAction<boolean>>;
}>(null!);

const persistReduceTransparencyCookie = (reduceTransparency: boolean): void => {
    document.cookie = `reduceTransparency=${reduceTransparency}; path=/; max-age=31536000; samesite=lax`;
};

/**
 * Provides accessibility settings to the application.
 * @param props - The props for the AccessibilityContextProvider component.
 * @param props.children - The children to receive the context.
 * @returns The AccessibilityContextProvider component.
 */
export function AccessibilityContextProvider({ children, initialReduceTransparency = false }: { children: ReactNode; initialReduceTransparency?: boolean; }): ReactNode {
    const [reduceTransparency, setReduceTransparency] = useState<boolean>(initialReduceTransparency);

    useEffect(() => {
        persistReduceTransparencyCookie(reduceTransparency);
    }, [reduceTransparency]);

    return (
        <AccessibilityContext.Provider value={{ reduceTransparency, setReduceTransparency }}>
            {children}
        </AccessibilityContext.Provider>
    );
}
