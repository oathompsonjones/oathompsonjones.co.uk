import "@mui/material-pigment-css/styles.css";
import "styles/layout.css";
import "styles/transitions.css";
import "styles/typography.css";
import "styles/glass.css";
import "styles/recaptcha.css";
import type { Metadata, Viewport } from "next";
import { gravatarURL, title } from "utils";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Footer } from "components/footer";
import { Header } from "components/header";
import InitColorSchemeScript from "@mui/system/InitColorSchemeScript";
import { Providers } from "contexts/providers";
import type { ReactNode } from "react";
import { ScrollToTop } from "components/scrollToTop";
import { cookies } from "next/headers";
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
    title: title("Software Developer"),
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
export default async function Layout({ children }: { children: ReactNode; }): Promise<ReactNode> {
    const cookieStore = await cookies();
    const initialReduceTransparency = cookieStore.get("reduceTransparency")?.value === "true";

    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <InitColorSchemeScript attribute="class" />
                <AppRouterCacheProvider>
                    <Providers initialReduceTransparency={initialReduceTransparency}>
                        <ScrollToTop />
                        <Header />
                        <main>{children}</main>
                        <Footer />
                    </Providers>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
