"use client";

import { AccessibilityContextProvider } from "./accessibility";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import type { ReactNode } from "react";
import { ThemeContextProvider } from "./theme";

/**
 * Contains any context providers.
 * @param props - The props to pass to the layout.
 * @param props.children - The children to render.
 * @returns The context providers.
 */
export function Providers({ children, initialReduceTransparency }: { children: ReactNode; initialReduceTransparency: boolean; }): ReactNode {
    return (
        <AccessibilityContextProvider initialReduceTransparency={initialReduceTransparency}>
            <ThemeContextProvider>
                <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}>
                    {children}
                </GoogleReCaptchaProvider>
            </ThemeContextProvider>
        </AccessibilityContextProvider>
    );
}
