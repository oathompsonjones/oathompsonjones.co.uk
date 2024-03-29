"use client";

import { useEffect, useState } from "react";
import BackgroundCursor from "pages/(home)/backgrounds/cursor";
import { Box } from "@mui/material";
import type { ReactElement } from "react";
import useWindowSize from "hooks/useWindowSize";

/**
 * A section on the home page.
 * @param background - The background.
 * @param children - The children.
 * @returns A section on the home page.
 */
export default function Section({ background, children }: {
    readonly background?: ReactElement;
    readonly children?: ReactElement | ReactElement[];
}): ReactElement {
    const { innerHeight } = useWindowSize();
    const [height, setHeight] = useState(0);

    useEffect(() => setHeight(innerHeight - document.querySelector("footer")!.scrollHeight), [innerHeight]);

    return (
        <Box
            component="section"
            sx={{
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "&:last-of-type": { margin: "-4rem -1rem -1rem", minHeight: `${height}px` },
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "-4rem -1rem 4rem",
                minHeight: "100dvh",
                overflow: "hidden",
                padding: "5rem 1rem 1rem",
                position: "relative",
                scrollSnapAlign: "start",
            }}
        >
            <Box zIndex={-1}>{background ?? <BackgroundCursor />}</Box>
            <Box sx={{ width: "100%" }}>{children}</Box>
        </Box>
    );
}
