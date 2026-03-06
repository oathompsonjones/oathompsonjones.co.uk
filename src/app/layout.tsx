import "@mui/material-pigment-css/styles.css";
import "styles/layout.css";
import "styles/transitions.css";
import "styles/typography.css";
import "styles/background.css";
import "styles/glass.css";
import type { Metadata, Viewport } from "next";
import { Footer } from "components/footer";
import { Header } from "components/header";
import InitColorSchemeScript from "@mui/system/InitColorSchemeScript";
import { Providers } from "contexts/providers";
import type { ReactNode } from "react";
import { ScrollToTop } from "components/scrollToTop";
import { gravatarURL } from "utils";
import keywords from "public/keywords.json";

// https://realfavicongenerator.net (remove the mask icon and msapplication stuff)
export const metadata: Metadata = {
    description: "Portfolio site for Oliver Jones (oathompsonjones).",
    icons: {
        apple: gravatarURL(180),
        icon: [gravatarURL(32), gravatarURL(16)],
        shortcut: gravatarURL(16),
    },
    keywords: Array.isArray(keywords) ? keywords : [],
    title: "Oliver Jones | Software Developer",
};

export const viewport: Viewport = {
    initialScale: 1,
    themeColor: "#1c7eea",
    viewportFit: "cover",
    width: "device-width",
};

/**
 * A wrapper to build every page.
 * @param props - The properties of the component.
 * @param props.children - The children to render.
 * @returns A page wrapper.
 */
export default function Layout({ children }: { children: ReactNode; }): ReactNode {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <InitColorSchemeScript attribute="class" />
                <Providers>
                    <ScrollToTop />
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
