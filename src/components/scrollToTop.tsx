"use client";
import { Fab, Zoom, useScrollTrigger } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { useCallback } from "react";

export default function ScrollToTop(): JSX.Element {
    const scrolling: boolean = useScrollTrigger({ disableHysteresis: true, threshold: 75 });
    const scrollToTop = useCallback(() => {
        window.scrollTo({ behavior: "smooth", top: 0 });
    }, []);
    return (
        <Zoom in={scrolling}>
            <Fab
                color="secondary"
                onClick={scrollToTop}
                size="small"
                sx={{
                    bottom: "2rem",
                    left: "100%",
                    position: "sticky",
                    right: "2rem"
                }}
            >
                <KeyboardArrowUp />
            </Fab>
        </Zoom>
    );
}

