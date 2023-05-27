"use client";
import { Fab, Zoom, useScrollTrigger } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { useCallback } from "react";

export default function ScrollToTop(): JSX.Element {
    const scrolling: boolean = useScrollTrigger({ disableHysteresis: true, threshold: 75 });
    const scrollToTop = useCallback(() => window.scrollTo({ behavior: "smooth", top: 0 }), []);
    return (
        <Zoom in={scrolling}>
            <Fab
                onClick={scrollToTop}
                size="small"
                sx={{
                    bottom: 0,
                    margin: "2rem",
                    position: "fixed",
                    right: 0
                }}
            >
                <KeyboardArrowUp />
            </Fab>
        </Zoom>
    );
}

