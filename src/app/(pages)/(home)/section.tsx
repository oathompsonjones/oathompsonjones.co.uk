"use client";

import type { ReactElement, ReactNode } from "react";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
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
                    md: {
                        marginBottom: "-1rem",
                        minHeight: `${height}px`,
                    },
                },
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: { md: "-4rem -3rem 4rem" },
                minHeight: { md: "100vh" },
                overflow: "hidden",
                padding: { md: "5rem 3rem 1rem" },
                position: "relative",
                scrollSnapAlign: { md: "start", xs: "center" },
            }}
        >
            <Box width="100%">{children}</Box>
        </Box>
    );
}
