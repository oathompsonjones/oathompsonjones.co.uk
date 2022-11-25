import "./main.css";
import { About, Contact, Error, Gallery, Home, Portfolio } from "./Pages";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Root } from "./Components";

export default (): JSX.Element => {
    const pages: Array<{ element: JSX.Element; label: string; link: string; }> = [
        { element: <About />, label: "About Me", link: "/about" },
        { element: <Portfolio />, label: "Portfolio", link: "/portfolio" },
        { element: <Gallery />, label: "Gallery", link: "/gallery" },
        { element: <Contact />, label: "Contact Me", link: "/contact" }
    ];

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Root pages={pages} />}>
                <Route
                    index
                    element={<Home />}
                    loader={(): string => document.title = "Oliver Jones"}
                />
                {pages.map(({ element, label, link }) => <Route
                    path={link}
                    element={element}
                    loader={(): string => document.title = `Oliver Jones | ${label}`}
                />)}
                <Route
                    path="*"
                    element={<Error />}
                    loader={(): string => document.title = "Oliver Jones | Error 404"}
                />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};