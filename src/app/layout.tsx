import type { Metadata, Viewport } from "next";
import BackgroundCursor from "components/cursor";
import Footer from "components/footer";
import Head from "next/head.js";
import Header from "components/header";
import type { ReactElement } from "react";
import ScrollToTop from "components/scrollToTop";
import { ThemeProvider } from "contexts/themeContext";
import { gravatarURL } from "utils";

// https://realfavicongenerator.net (remove the mask icon and msapplication stuff)
export const metadata: Metadata = {
    description: "Portfolio site for Oliver Jones (oathompsonjones).",
    icons: {
        apple: gravatarURL(180),
        icon: [gravatarURL(32), gravatarURL(16)],
        shortcut: gravatarURL(16),
    },
    keywords: [
        ["oathompsonjones", "Oliver Jones", "Oliver Andrew Thompson Jones", "Ollie Jones", "Ollie Andrew Thompson Jones"],
        ["Bishop's Stortford", "Edinburgh", "Edinburgh University"],
        ["Programmer", "Programming", "Program"],
        ["Coder", "Coding", "Code"],
        ["Software", "Software Engineer", "Software Engineering", "Software Developer", "Software Development"],
        ["Computer Science"],
        ["Portfolio", "CV", "Contact"],
    ].flat(),
    title: "Oliver Jones",
};

export const viewport: Viewport = {
    initialScale: 1,
    themeColor: "#1c7eea",
    width: "device-width",
};

/**
 * A wrapper to build every page.
 * @returns A page wrapper.
 */
export default function Layout({ children }: { readonly children: ReactElement; }): ReactElement {
    return (
        <html lang="en">
            <Head>
                <script
                    async crossOrigin="anonymous"
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4179343737367118"
                />
            </Head>
            <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <ThemeProvider>
                    <BackgroundCursor />
                    <Header />
                    <main>{children}</main>
                    <ScrollToTop />
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
