import About from "./about";
import Contact from "./contact";
import Main from "./main";
// Import Portfolio from "./portfolio";

/**
 * This is the home page.
 *
 * @returns The home page.
 */
export default function Home(): React.ReactElement {
    return (
        <>
            <Main />
            <About />
            {/* <Portfolio /> */}
            <Contact />
        </>
    );
}
