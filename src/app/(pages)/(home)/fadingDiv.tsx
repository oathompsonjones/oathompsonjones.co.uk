"use client";

import type { ReactElement } from "react";

/**
 * A div which will be used to either fade in or out.
 * @param children - The children.
 * @returns A div.
 */
export default function FadingDiv({ children }: {
    readonly children?: ReactElement | ReactElement[];
}): ReactElement {
    return (
        <div
            className="fadingDiv"
            style={{
                alignItems: "center",
                flexDirection: "column",
                display: "flex",
                filter: `opacity(0%)`,
                justifyContent: "center",
                minHeight: "100dvh",
                overflow: "hidden",
                padding: "5rem 0rem 1rem",
                position: "fixed",
                top: 0,
                transition: "filter 0.25s linear",
            }}>
            {children}
        </div>
    );
}
