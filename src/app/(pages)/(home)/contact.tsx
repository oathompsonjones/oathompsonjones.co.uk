import BackgroundCursor from "./backgrounds/cursor";
import ContactPage from "pages/contact/page";
import Section from "components/section";

export default function Contact(): JSX.Element {
    return (
        <Section background={<BackgroundCursor />} fill={false}>
            <ContactPage />
        </Section>
    );
}
