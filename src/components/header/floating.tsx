"use client";

import { MenuItem, Paper, Typography, useScrollTrigger } from "@mui/material";
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
        <Paper
            sx={{
                alignSelf: "center",
                backdropFilter: "blur(5px) saturate(200%) contrast(50%) brightness(100%)",
                backgroundColor: "rgba(var(--mui-palette-background-default), 1)",
                display: { md: "flex", xs: "none" },
                position: "fixed",
                top: "var(--top)",
                transition: "top 0.25s linear",
                zIndex: 1,
            }}
            // eslint-disable-next-line @typescript-eslint/naming-convention
            style={{ "--top": isScrolling && !isHome ? "1rem" : "-50px" }}
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
        </Paper>
    );
}
