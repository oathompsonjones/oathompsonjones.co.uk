"use client";
import { useEffect, useState } from "react";
import BackgroundCursor from "pages/(home)/backgrounds/cursor";
import { Box } from "@mui/material";
import useWindowSize from "hooks/useWindowSize";

export default function Section({ background, children }: {
    readonly background?: React.ReactElement;
    readonly children?: React.ReactElement;
}): React.ReactElement {
    const { innerHeight } = useWindowSize();
    const [height, setHeight] = useState(0);
    useEffect(() => setHeight(innerHeight - document.querySelector("footer")!.scrollHeight), [innerHeight]);

    return (
        <Box
            component="section"
            sx={{
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "&:last-of-type": { margin: "-4rem -1rem -1rem", minHeight: `${height}px` },
                "alignItems": "center",
                "display": "flex",
                "flexDirection": "column",
                "justifyContent": "center",
                "margin": "-4rem -1rem 4rem",
                "minHeight": "100dvh",
                "overflow": "hidden",
                "padding": "5rem 1rem 1rem",
                "position": "relative",
                "scrollSnapAlign": "start"
            }}
        >
            <Box zIndex={-1}>{background ?? <BackgroundCursor />}</Box>
            <Box sx={{ width: "100%" }}>{children}</Box>
        </Box>
    );
}
