"use client";
import { Fab, Zoom } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { useCallback } from "react";

export default function ScrollToTop({ scrolling }: { scrolling: boolean; }): JSX.Element {
    const scrollToTop = useCallback(() => {
        window.scrollTo({ behavior: "smooth", top: 0 });
    }, []);
    return (
        <Zoom in={scrolling}>
            <Fab
                color="primary"
                onClick={scrollToTop}
                size="small"
                sx={{
                    bottom: "2rem",
                    position: "fixed",
                    right: "2rem",
                    zIndex: 1
                }}
            >
                <KeyboardArrowUp />
            </Fab>
        </Zoom>
    );
}

