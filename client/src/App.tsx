import { About, Contact, Error, Gallery, Home, Portfolio } from "./Pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { Footer, Header, PageContainer } from "./Components";
import React, { Component } from "react";

export default class App extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones";

        const getTheme = (): "dark" | "light" => {
            let storedTheme: string | null = localStorage.getItem("theme");
            if (storedTheme === null) {
                storedTheme = useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light";
                localStorage.setItem("theme", storedTheme);
            }
            return storedTheme as "dark" | "light";
        };

        const toggleTheme = (): void => {
            localStorage.setItem("theme", getTheme() === "dark" ? "light" : "dark");
            this.forceUpdate();
        };

        const mainColour = "#1c7eea";
        const theme = createTheme({
            palette: {
                mode: getTheme(),
                primary: {
                    main: mainColour
                }
            },
            typography: ["body2", "h1", "h2", "h3", "h4", "h5", "h6"]
                .map((tag) => ({ [tag]: { color: mainColour } }))
                .reduce((a, b) => ({ ...a, ...b }))
        });

        return (
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                <BrowserRouter>
                    <style>{`
                        body {
                            transition: all 0.25s ease-in-out;
                        }
                        a {
                            color: ${mainColour}
                        }
                        a:hover, a {
                            text-decoration: none;
                            cursor: pointer;
                        }
                        ::-webkit-scrollbar {
                            width: 1px;
                            height: 1px;
                        }
                        ::-webkit-scrollbar-track {
                            background: #121212;
                        }
                        ::-webkit-scrollbar-thumb:hover,
                        ::-webkit-scrollbar-thumb {
                            background: ${theme.palette.primary.main};
                        }
                    `}</style>
                    <Header toggleTheme={toggleTheme} theme={getTheme()} colour={mainColour} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </ThemeProvider>
        );
    }
}
