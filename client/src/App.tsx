import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React, { Component } from "react";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Error from "./Pages/Error";
import Footer from "./Components/Footer";
import Gallery from "./Pages/Gallery";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Portfolio from "./Pages/Portfolio";

export default class App extends Component {
    public render(): JSX.Element {
        document.title = "Oliver Jones";

        const getTheme = (): "dark" | "light" => {
            let storedTheme: string | null = localStorage.getItem("theme");
            if (storedTheme === null) {
                storedTheme = "dark";
                localStorage.setItem("theme", storedTheme);
            }
            return storedTheme as "dark" | "light";
        };

        const toggleTheme = (): void => {
            localStorage.setItem("theme", getTheme() === "dark" ? "light" : "dark");
            this.forceUpdate();
        };

        const mainColour = "#1c7eea";
        // Not using Material UIs dark mode for the theme, because it changes the app bar colour.
        const theme = getTheme() === "dark"
            ? createTheme({
                palette: {
                    background: {
                        default: "#121212",
                        paper: "#1f1f1f"
                    },
                    divider: "rgba(255, 255, 255, 0.12)",
                    primary: {
                        main: mainColour
                    },
                    text: {
                        disabled: "rgba(255, 255, 255, 0.5)",
                        primary: "#fff",
                        secondary: "rgba(255, 255, 255, 0.7)"
                    }
                },
                typography: ["body2", "h1", "h2", "h3", "h4", "h5", "h6"]
                    .map((tag) => ({ [tag]: { color: mainColour } }))
                    .concat(["subtitle1", "subtitle2", "body1", "body2", "caption", "button", "overline"]
                        .map((tag) => ({ [tag]: { color: "#ededed" } }))
                    ).reduce((a, b) => ({ ...a, ...b }))
            })
            : createTheme({
                palette: {
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
                    <Header toggleTheme={toggleTheme} theme={getTheme()} />
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
