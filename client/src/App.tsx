import "./main.css";
import { About, Contact, Error, Gallery, Home, Portfolio } from "./Pages";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import type { IPage } from "./Contexts";
import { PagesContext } from "./Contexts";
import { Root } from "./Components";

/**
 * Creates the website router, then renders each page when needed.
 *
 * @returns {JSX.Element} A RouterProvider element, which uses the router that is created,
 * wrapped by a context provider which the Header access to render links.
 */
export default (): JSX.Element => {
    // Contains all pages for the site.
    const pages: IPage[] = [
        { element: <Home />, label: "", link: "/" },
        { element: <About />, label: "About Me", link: "/about" },
        { element: <Portfolio />, label: "Portfolio", link: "/portfolio" },
        { element: <Gallery />, label: "Gallery", link: "/gallery" },
        // { element: <Arcade />, label: "Arcade", link: "/arcade" },
        { element: <Contact />, label: "Contact Me", link: "/contact" },
        { element: <Error code={404} />, label: "Error 404", link: "*" }
    ];

    // Creates the page router.
    const router = createBrowserRouter(
        createRoutesFromElements(
            // Creates a base root, passing the Root component as an element.
            <Route element={<Root />} errorElement={<Error code={500} />} path="/">
                {
                    // Maps each page object into a Route element.
                    pages.map(({ element, label, link }, i) => (
                        <Route
                            element={element}
                            errorElement={<Error code={500} />}
                            index={link === "/"}
                            key={i}
                            loader={(): string => (document.title = label.length > 0 ? `Oliver Jones | ${label}` : "Oliver Jones")}
                            path={link === "/" ? "" : link}
                        />
                    ))
                }
            </Route>
        )
    );

    // Returns the JSX Element which provides the router created above.
    return (
        <PagesContext.Provider value={pages.filter((page) => page.link.length > 1)}>
            <RouterProvider router={router} />
        </PagesContext.Provider>
    );
};
