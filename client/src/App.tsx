import "./main.css";
import { About, Contact, Error, Gallery, Home, Portfolio } from "./Pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CSSVariableLoader, Footer, Header, PageContainer } from "./Components";
import { CssBaseline, ThemeProvider, createTheme, darken, lighten, responsiveFontSizes, useMediaQuery } from "@mui/material";
import { useLocalStorage } from "./Hooks";

export default (): JSX.Element => {
    document.title = "Oliver Jones";

    const systemTheme = useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light";
    const [themeMode, setThemeMode] = useLocalStorage<"dark" | "light">("theme", systemTheme);
    const toggleTheme = (): void => setThemeMode(themeMode === "dark" ? "light" : "dark");

    const cssVars = {
        backgroundColour: themeMode === "dark" ? "#121212" : "#ffffff",
        linkColour: "#1c7eea",
        mainColour: "#1c7eea"
    };

    const theme = responsiveFontSizes(createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: cssVars.mainColour
            }
        },
        typography: ["h1", "h2", "h3", "h4", "h5", "h6"]
            .map((tag) => ({ [tag]: { color: cssVars.mainColour } }))
            .reduce((a, b) => ({ ...a, ...b }))
    }));

    const footerHeight = "15vh";

    return <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <CSSVariableLoader cssVars={cssVars} />
            <Header toggleTheme={toggleTheme} theme={themeMode} />
            <Routes>
                <Route path="/" element={<PageContainer footerHeight={footerHeight} />}>
                    <Route index element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
            <Footer
                backgroundColour={themeMode === "dark" ? lighten(cssVars.backgroundColour, 0.1) : darken(cssVars.backgroundColour, 0.1)}
                borderColour={cssVars.mainColour}
                footerHeight={footerHeight}
            />
        </ThemeProvider>
    </BrowserRouter>;
};