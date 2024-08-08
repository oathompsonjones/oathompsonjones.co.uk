"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import type { ReactElement } from "react";
import useWindowSize from "hooks/useWindowSize";

/**
 * A section on the home page.
 * @param children - The children.
 * @returns A section on the home page.
 */
export default function Section({ children }: { readonly children?: ReactElement | ReactElement[]; }): ReactElement {
    const { height: windowHeight } = useWindowSize();
    const [height, setHeight] = useState(0);

    useEffect(() => setHeight(windowHeight - document.querySelector("footer")!.scrollHeight), [windowHeight]);

    return (
        <Box
            component="section"
            sx={{
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "&:last-of-type": { marginBottom: "-1rem", minHeight: `${height}px` },
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "-4rem -3rem 4rem",
                minHeight: "100dvh",
                overflow: "hidden",
                padding: "5rem 3rem 1rem",
                position: "relative",
                scrollSnapAlign: "start",
            }}
        >
            <Box width="100%">{children}</Box>
        </Box>
    );
}
