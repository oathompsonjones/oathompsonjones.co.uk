import "@mui/material-pigment-css/styles.css";
import "styles/layout.css";
import "styles/scrolling.css";
import "styles/transitions.css";
import "styles/typography.css";
import type { Metadata, Viewport } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Footer } from "components/footer";
import { Header } from "components/header";
import InitColorSchemeScript from "@mui/system/InitColorSchemeScript";
import type { ReactNode } from "react";
import { ScrollToTop } from "components/scrollToTop";
import { ThemeContextProvider } from "contexts/themeContext";
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
export default function Layout({ children }: { children: ReactNode; }): ReactNode {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <InitColorSchemeScript attribute="class" />
                <AppRouterCacheProvider>
                    <ThemeContextProvider>
                        <div
                            style={{
                                backgroundImage: "radial-gradient(rgba(var(--mui-palette-primary-mainChannel) " +
                                    "/ 0.5) 2px, transparent 0)",
                                backgroundSize: "2vw 2vw",
                                boxShadow: "inset -15vw -15vh 15vw 15vh var(--mui-palette-background-default)",
                                height: "100vh",
                                left: 0,
                                overflow: "hidden",
                                position: "fixed",
                                top: 0,
                                transition: "box-shadow 0.25s linear",
                                width: "100vw",
                                zIndex: -10,
                            }}
                        />
                        <ScrollToTop />
                        <Header />
                        <main>{children}</main>
                        <Footer />
                    </ThemeContextProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
