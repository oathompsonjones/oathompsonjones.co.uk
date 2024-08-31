"use client";

import type { ReactElement, ReactNode } from "react";
import { useEffect, useState } from "react";
import Box from "components/layout/box";
import { useWindowSize } from "hooks/useWindowSize";

/**
 * A section on the home page.
 * @param props - The component properties.
 * @param props.children - The children to render.
 * @returns A section on the home page.
 */
export function Section({ children }: { children: ReactNode; }): ReactElement {
    const { height: windowHeight } = useWindowSize();
    const [height, setHeight] = useState(0);

    useEffect(() => setHeight(windowHeight - document.querySelector("footer")!.scrollHeight), [windowHeight]);

    return (
        <Box
            component="section"
            sx={{
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "&:last-of-type": {
                    marginBottom: { md: "-1rem" },
                    minHeight: { md: "var(--height)" },
                },
                display: "flex",
                flexDirection: "column",
                margin: { md: "-4rem -3rem 4rem" },
                minHeight: { md: "100vh" },
                padding: { md: "5rem 3rem 1rem" },
                scrollSnapAlign: { md: "start", xs: "center" },
            }}
            // eslint-disable-next-line @typescript-eslint/naming-convention
            style={{ "--height": `${height}px` }}
        >
            {children}
        </Box>
    );
}
