import { CSSVariableLoader, Footer, Header } from "../";
import { CssBaseline, ThemeProvider, createTheme, darken, lighten, responsiveFontSizes, useMediaQuery } from "@mui/material";
import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import { useLocalStorage } from "../../Hooks";

export const Root = ({ navBarLinks }: { navBarLinks: Array<{ element: JSX.Element; label: string; link: string; }>; }): JSX.Element => {
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

    return <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <CSSVariableLoader cssVars={cssVars} />
        <Header pages={navBarLinks} toggleTheme={toggleTheme} theme={themeMode} />
        <Container style={{ paddingBottom: footerHeight, width: "100vw" }}>
            <Outlet />
        </Container>
        <Footer
            backgroundColour={themeMode === "dark" ? lighten(cssVars.backgroundColour, 0.1) : darken(cssVars.backgroundColour, 0.1)}
            borderColour={cssVars.mainColour}
            footerHeight={footerHeight}
        />
    </ThemeProvider>;
};