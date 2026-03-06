"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useState } from "react";

export const AccessibilityContext = createContext<{
    reduceTransparency: boolean;
    setReduceTransparency: Dispatch<SetStateAction<boolean>>;
}>(null!);

/**
 * Provides accessibility settings to the application.
 * @param props - The props for the AccessibilityContextProvider component.
 * @param props.children - The children to receive the context.
 * @returns The AccessibilityContextProvider component.
 */
export function AccessibilityContextProvider({ children }: { children: ReactNode; }): ReactNode {
    const [reduceTransparency, setReduceTransparency] = useState<boolean>(false);

    return (
        <AccessibilityContext.Provider value={{ reduceTransparency, setReduceTransparency }}>
            {children}
        </AccessibilityContext.Provider>
    );
}
