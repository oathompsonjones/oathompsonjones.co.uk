import "./globals.css";
import { AVATAR_URL_ } from "@/constants";
import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/themeContext";

// https://realfavicongenerator.net (remove the mask icon and msapplication stuff)
export const metadata: Metadata = {
    description: "Portfolio site for Oliver Jones (oathompsonjones).",
    icons: {
        apple: AVATAR_URL_(180),
        icon: [AVATAR_URL_(32), AVATAR_URL_(16)],
        shortcut: AVATAR_URL_(16)
    },
    themeColor: "#1c7eea",
    title: "Oliver Jones",
    viewport: {
        initialScale: 1,
        width: "device-width"
    }
};

/**
 * A wrapper to build every page including 404.
 *
 * @returns {JSX.Element} A page wrapper.
 */
export default function Layout({ children }: { children: React.ReactNode; }): JSX.Element {
    return (
        <html lang="en">
            <head>
                <script
                    async crossOrigin="anonymous"
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4179343737367118"
                />
            </head>
            <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
