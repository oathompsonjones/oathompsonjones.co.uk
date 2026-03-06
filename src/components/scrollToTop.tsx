"use client";

import { Fab, Zoom } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { KeyboardArrowUp } from "@mui/icons-material";
import type { ReactNode } from "react";

/**
 * Scrolls to the top of the page when clicked.
 * @returns A button that scrolls to the top of the page when clicked.
 */
export function ScrollToTop(): ReactNode {
    const scrollToTop = useCallback(() => window.scrollTo({ behavior: "smooth", top: 0 }), []);
    const [scrollProgress, setScrollProgress] = useState(0);

    /** Handles the scroll event and updates the scroll progress state. */
    function handleScroll(): void {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const totalHeight = scrollHeight - clientHeight;
        const progress = scrollTop / totalHeight * 100;

        setScrollProgress(progress);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return (): void => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Scroll indicator at top of page. */}
            <Box
                className="edge"
                sx={{
                    backgroundColor: "primary.main",
                    height: "5px",
                    left: 0,
                    position: "fixed",
                    top: 0,
                    width: `${scrollProgress}%`,
                    zIndex: 99999,
                }}
            />
            {/* Scroll to top button at bottom right of page. */}
            <Zoom in={scrollProgress > 0}>
                <Fab
                    onClick={scrollToTop}
                    size="small"
                    sx={{
                        bottom: 0,
                        margin: "4rem",
                        position: "fixed",
                        right: 0,
                        zIndex: 99999,
                    }}
                >
                    <KeyboardArrowUp />
                </Fab>
            </Zoom>
        </>
    );
}
