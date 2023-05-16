"use client";
import Footer from "components/footer";
import Header from "components/header";
import ScrollToTop from "components/scrollToTop";
import { ThemeProvider } from "contexts/themeContext";
import { useScrollTrigger } from "@mui/material";

/**
 * A wrapper to build every page.
 *
 * @returns {JSX.Element} A page wrapper.
 */
export default function Layout({ children }: { children: React.ReactNode; }): JSX.Element {
    const scrolling: boolean = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
    return (
        <ThemeProvider>
            <Header scrolling={scrolling} />
            <ScrollToTop scrolling={scrolling} />
            <div style={{ flex: 1, padding: "4rem 1% 1%" }}>
                {children}
            </div>
            <Footer />
        </ThemeProvider>
    );
}
