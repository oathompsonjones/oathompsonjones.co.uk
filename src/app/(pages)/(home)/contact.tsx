import BackgroundCursor from "./backgrounds/cursor";
import ContactPage from "pages/contact/page";
import Section from "components/section";

export default function Contact(): React.ReactNode {
    return (
        <Section background={<BackgroundCursor />}>
            <ContactPage />
        </Section>
    );
}
