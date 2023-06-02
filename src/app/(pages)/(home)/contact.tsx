import ContactPage from "pages/contact/page";
import Section from "components/section";

export default function Contact(): JSX.Element {
    return (
        <Section fill={false}>
            <ContactPage />
        </Section>
    );
}
