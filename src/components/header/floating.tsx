"use client";

import { MenuItem, Typography, useScrollTrigger } from "@mui/material";
import Box from "components/layout/box";
import Link from "next/link";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Contains the floating nav bar for larger displays.
 * @param props - The component properties.
 * @param props.pages - The pages to display in the nav.
 * @returns The floating nav bar.
 */
export function Floating({ pages }: {
    pages: Array<{ label: string; link: string; }>;
}): ReactNode {
    const isHome: boolean = usePathname() === "/";
    const isScrolling: boolean = useScrollTrigger({ disableHysteresis: true, threshold: 100 });

    return (
        <Box
            sx={{
                alignSelf: "center",
                backdropFilter: "blur(5px) saturate(200%) contrast(50%) brightness(100%)",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "2vmin",
                display: { md: "flex", xs: "none" },
                opacity: "var(--opacity)",
                position: "fixed",
                top: "1rem",
                transition: "opacity 0.25s linear",
                zIndex: 1,
            }}
            // eslint-disable-next-line @typescript-eslint/naming-convention
            style={{ "--opacity": isScrolling && !isHome ? "100%" : "0%" }}
        >
            {pages.map((page, i) => (
                <MenuItem
                    component={Link}
                    href={page.link}
                    key={i}
                    sx={{ transition: "background-color 0.25s linear" }}
                >
                    <Typography variant="h5" color="inherit">{page.label}</Typography>
                </MenuItem>
            ))}
        </Box>
    );
}
