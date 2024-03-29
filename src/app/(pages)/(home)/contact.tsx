import ContactPage from "pages/contact/page";
import type { ReactElement } from "react";
import Section from "./section";

/**
 * This page displays contact information.
 * @returns Contact information.
 */
export default function Contact(): ReactElement {
    return (
        <Section>
            <ContactPage />
        </Section>
    );
}
