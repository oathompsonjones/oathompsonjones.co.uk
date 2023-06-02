import Footer from "components/footer";
import { GRAVATAR_URL_ } from "utils";
import Header from "components/header";
import type { Metadata } from "next";
import ScrollToTop from "components/scrollToTop";
import { ThemeProvider } from "contexts/themeContext";

// https://realfavicongenerator.net (remove the mask icon and msapplication stuff)
export const metadata: Metadata = {
    description: "Portfolio site for Oliver Jones (oathompsonjones).",
    icons: {
        apple: GRAVATAR_URL_(180),
        icon: [GRAVATAR_URL_(32), GRAVATAR_URL_(16)],
        shortcut: GRAVATAR_URL_(16)
    },
    keywords: [
        ["oathompsonjones", "Oliver Jones", "Oliver Andrew Thompson Jones", "Ollie Jones", "Ollie Andrew Thompson Jones"],
        ["Bishop's Stortford", "Edinburgh", "Edinburgh University"],
        ["Programmer", "Programming", "Program"],
        ["Coder", "Coding", "Code"],
        ["Software", "Software Engineer", "Software Engineering", "Software Developer", "Software Development"],
        ["Computer Science"],
        ["Portfolio", "CV", "Contact"]
    ].flat(),
    themeColor: "#1c7eea",
    title: "Oliver Jones",
    viewport: {
        initialScale: 1,
        width: "device-width"
    }
};

/**
 * A wrapper to build every page.
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
                    <Header />
                    <main>{children}</main>
                    <ScrollToTop />
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
