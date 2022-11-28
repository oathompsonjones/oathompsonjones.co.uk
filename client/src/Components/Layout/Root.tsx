import { CSSVariableLoader, Footer, Header } from "../";
import { CssBaseline, ThemeProvider, createTheme, darken, lighten, responsiveFontSizes, useMediaQuery } from "@mui/material";
import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import { useLocalStorage } from "../../Hooks";

/**
 * A wrapper to build every page.
 *
 * @param {{ navBarLinks: Array<{ element: JSX.Element; label: string; link: string; }>; }} props An object containing the component props.
 * @param {Array<{ element: JSX.Element; label: string; link: string; }>} props.navBarLinks An array of pages to render in the navbar.
 * @param {JSX.Element} props.navBarLinks[].element The JSX Element for the page.
 * @param {string} props.navBarLinks[].label The navbar name for the page.
 * @param {string} props.navBarLinks[].link The link to the page.
 * @returns {JSX.Element} A page wrapper.
 */
export const Root = ({ navBarLinks }: { navBarLinks: Array<{ element: JSX.Element; label: string; link: string; }>; }): JSX.Element => {
    // Controls the behaviour for changing between dark and light theme.
    const systemTheme = useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light";
    const [themeMode, setThemeMode] = useLocalStorage<"dark" | "light">("theme", systemTheme);
    const toggleTheme = (): void => setThemeMode(themeMode === "dark" ? "light" : "dark");

    // These variables will be parsed into CSS.
    const cssVars = {
        backgroundColour: themeMode === "dark" ? "#121212" : "#ffffff",
        linkColour: "#1c7eea",
        mainColour: "#1c7eea"
    };

    // Constructs the colour theme for the site.
    const theme = responsiveFontSizes(createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: cssVars.mainColour
            }
        },
        // Makes any h tags render with the main site colour.
        typography: ["h1", "h2", "h3", "h4", "h5", "h6"]
            .map((tag) => ({ [tag]: { color: cssVars.mainColour } }))
            .reduce((a, b) => ({ ...a, ...b }))
    }));

    // Controls the size of the footer element.
    const footerHeight = "15vh";

    // Returns a theme provider, which passes the site theme onto all child elements.
    return <ThemeProvider theme={theme}>
        {/* CssBaseLine ensures that the background colour responds to the site theme. */}
        <CssBaseline enableColorScheme />
        {/* CSSVariableLoader loads the cssVars into the site's CSS. */}
        <CSSVariableLoader cssVars={cssVars} />
        {/* Renders the page header. */}
        <Header pages={navBarLinks} toggleTheme={toggleTheme} theme={themeMode} />
        {/* This Container contains the main page content. */}
        <Container style={{ paddingBottom: footerHeight, width: "100vw" }}>
            {/* Renders the page itself. */}
            <Outlet />
        </Container>
        {/* Renders the page footer. */}
        <Footer
            backgroundColour={themeMode === "dark" ? lighten(cssVars.backgroundColour, 0.1) : darken(cssVars.backgroundColour, 0.1)}
            borderColour={cssVars.mainColour}
            footerHeight={footerHeight}
        />
    </ThemeProvider>;
};