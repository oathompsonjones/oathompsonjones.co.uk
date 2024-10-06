"use client";

import { useEffect, useState } from "react";
import Box from "components/layout/box";
import type { ReactNode } from "react";

/**
 * A section on the home page.
 * @param props - The component properties.
 * @param props.allowFooter - Whether to allow space for the footer.
 * @param props.children - The children to render.
 * @returns A section on the home page.
 */
export function Section({ allowFooter, children }: { allowFooter?: boolean; children?: ReactNode; }): ReactNode {
    const [footerHeight, setFooterHeight] = useState(0);

    useEffect(() => setFooterHeight(document.querySelector("footer")!.scrollHeight), []);

    return (
        <Box
            className="edge"
            component="section"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "-4rem 0 -4rem 0",
                minHeight: { lg: "var(--height)", xs: "auto" },
                padding: "4rem 0 4rem 0",
                scrollSnapAlign: { lg: "start" },
                width: "100%",
            }}
            // eslint-disable-next-line @typescript-eslint/naming-convention
            style={{ "--height": allowFooter ?? false ? `calc(100vh - ${footerHeight}px - 1rem)` : "100vh" }}
        >
            <div className="wrapper">{children}</div>
        </Box>
    );
}
