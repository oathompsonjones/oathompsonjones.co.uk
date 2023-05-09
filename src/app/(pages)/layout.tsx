import "../globals.css";
import Container from "@mui/material/Container";
import Footer from "@/components/footer";
import Header from "@/components/header";

/**
 * A wrapper to build every page.
 *
 * @returns {JSX.Element} A page wrapper.
 */
export default function Layout({ children }: { children: React.ReactNode; }): JSX.Element {
    return (
        <>
            <Header />
            <Container disableGutters style={{ flex: 1, height: "100%", width: "100%" }}>
                {children}
            </Container>
            <Footer />
        </>
    );
}
