import "./main.css";
import { About, Contact, Error, Gallery, Home, Portfolio } from "./Pages";
import { IPage, PagesContext } from "./Contexts";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Root } from "./Components";

/**
 * Creates the website router, then renders each page when needed.
 *
 * @returns {JSX.Element} A RouterProvider element, which uses the router that is created, wrapped by a context provider which the Header access to render links.
 */
export default (): JSX.Element => {
    // Contains all pages for the site.
    const pages: IPage[] = [
        { element: <Home />, label: "", link: "/" },
        { element: <About />, label: "About Me", link: "/about" },
        { element: <Portfolio />, label: "Portfolio", link: "/portfolio" },
        { element: <Gallery />, label: "Gallery", link: "/gallery" },
        { element: <Contact />, label: "Contact Me", link: "/contact" },
        { element: <Error code={404} />, label: "Error 404", link: "*" }
    ];

    // Creates the page router.
    const router = createBrowserRouter(
        createRoutesFromElements(
            // Creates a base root, passing the Root component as an element.
            // The root element takes an argument which lists the pages that need showing in the nav bar.
            <Route path="/" element={<Root />} errorElement={<Error code={500} />}>{
                // Maps each page object into a Route element.
                pages.map(({ element, label, link }) => <Route
                    index={link === "/"}
                    path={link === "/" ? undefined : link}
                    element={element}
                    errorElement={<Error code={500} />}
                    loader={(): string => document.title = label.length > 0 ? `Oliver Jones | ${label}` : "Oliver Jones"}
                />)
            }</Route>
        )
    );

    // Returns the JSX Element which provides the router created above.
    return <PagesContext.Provider value={pages.filter((page) => page.link.length > 1)}>
        <RouterProvider router={router} />
    </PagesContext.Provider>;
};