import "styles/global.css";
import type { Metadata, Viewport } from "next";
import type { ReactElement, ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Footer } from "components/footer";
import Head from "next/head.js";
import { Header } from "components/header";
import { ScrollToTop } from "components/scrollToTop";
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
        "oathompsonjones",
        "Oliver Jones",
        "Oliver Andrew Thompson Jones",
        "Ollie Jones",
        "Ollie Andrew Thompson Jones",
        "Bishop's Stortford",
        "Edinburgh",
        "Edinburgh University",
        "Programmer",
        "Programming",
        "Program",
        "Coder",
        "Coding",
        "Code",
        "Software",
        "Software Engineer",
        "Software Engineering",
        "Software Developer",
        "Software Development",
        "Development",
        "Developer",
        "Computer Science",
        "Computing",
        "Computer Scientist",
        "CS",
        "Portfolio",
        "CV",
        "Contact",
    ],
    title: "Oliver Jones",
};

export const viewport: Viewport = {
    initialScale: 1,
    themeColor: "#1c7eea",
    width: "device-width",
};

/**
 * A wrapper to build every page.
 * @param props - The properties of the component.
 * @param props.children - The children to render.
 * @returns A page wrapper.
 */
export default function Layout({ children }: { children: ReactNode; }): ReactElement {
    return (
        <html lang="en">
            <Head>
                <script
                    async crossOrigin="anonymous"
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4179343737367118"
                />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1c7eea" />
                <meta name="msapplication-TileColor" content="#1c7eea" />
                <meta name="theme-color" content="#1c7eea" />
            </Head>
            <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <AppRouterCacheProvider>
                    <ThemeProvider>
                        <div id="background" />
                        <ScrollToTop />
                        <Header />
                        <main>{children}</main>
                        <Footer />
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
