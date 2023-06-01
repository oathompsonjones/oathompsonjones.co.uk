import About from "./about";
import Contact from "./contact";
import Main from "./main";
// Import Portfolio from "./portfolio";

/**
 * This is the home page.
 *
 * @returns {JSX.Element} The home page.
 */
export default function Home(): JSX.Element {
    return (
        <>
            <Main />
            <About />
            {/* <Portfolio /> */}
            <Contact />
        </>
    );
}
