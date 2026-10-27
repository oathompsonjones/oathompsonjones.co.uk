import "@mui/material-pigment-css/styles.css";
import "highlight.js/styles/atom-one-dark.css";
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
import { colours } from "components/tartan";
import { cookies } from "next/headers";
import keywords from "public/keywords.json";

const personStructuredData = JSON.stringify({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "@context": "https://schema.org",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "@type": "Person",
    address: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "@type": "PostalAddress",
        addressCountry: "GB",
        addressLocality: "London",
    },
    alternateName: ["Ollie Jones", "Oliver Andrew Thompson Jones", "oathompsonjones"],
    image: gravatarURL(1200),
    jobTitle: "Software Developer",
    name: "Oliver Jones",
    sameAs: [
        "https://github.com/oathompsonjones",
        "https://linkedin.com/in/oathompsonjones",
        "https://stackoverflow.com/users/11840092/oathompsonjones",
        "https://x.com/oathompsonjones",
    ],
    url: "https://oathompsonjones.co.uk",
}).replace(/</gu, "\\u003c");

// https://realfavicongenerator.net (remove the mask icon and msapplication stuff)
export const metadata: Metadata = {
    description: [
        "Oliver Jones is a London-based software developer. Explore his software projects,",
        "technical articles, CV, and developer tools.",
    ].join(" "),
    icons: {
        apple: gravatarURL(180),
        icon: [gravatarURL(32), gravatarURL(16)],
        shortcut: gravatarURL(16),
    },
    keywords: Array.isArray(keywords) ? keywords : [],
    metadataBase: new URL("https://oathompsonjones.co.uk"),
    openGraph: {
        description: [
            "Oliver Jones is a London-based software developer. Explore his software projects,",
            "technical articles, CV, and developer tools.",
        ].join(" "),
        images: [{ alt: "Oliver Jones", height: 1200, url: gravatarURL(1200), width: 1200 }],
        locale: "en_GB",
        siteName: "Oliver Jones",
        title: title("Software Developer"),
        type: "website",
        url: "/",
    },
    title: title("Software Developer"),
    twitter: {
        card: "summary_large_image",
        description: [
            "Oliver Jones is a London-based software developer. Explore his software projects,",
            "technical articles, CV, and developer tools.",
        ].join(" "),
        images: [gravatarURL(1200)],
        title: title("Software Developer"),
    },
};

export const viewport: Viewport = {
    initialScale: 1,
    themeColor: colours.maroon,
    viewportFit: "cover",
    width: "device-width",
};

/**
 * A wrapper to build every page.
 * @param props - The properties of the component.
 * @param props.children - The children to render.
 * @returns A page wrapper.
 */
export default async function Layout({ children }: { readonly children: ReactNode; }): Promise<ReactNode> {
    const cookieStore = await cookies();
    const initialReduceTransparency = cookieStore.get("reduceTransparency")?.value === "true";

    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <script
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        __html: personStructuredData,
                    }}
                    type="application/ld+json"
                />
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
