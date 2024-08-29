"use client";

import { PageError } from "components/pageError";
import type { ReactElement } from "react";

/**
 * Handles errors for the page.
 * @param props - The component properties.
 * @param props.error - The error that occurred.
 * @param props.reset - The function to reset the application.
 * @returns An error element.
 */
export default function Error({ error, reset }: { error: Error; reset: () => void; }): ReactElement {
    return (<PageError error={error} reset={reset} />);
}
