"use client";

import { MenuItem, Typography, useScrollTrigger } from "@mui/material";
import { Glass } from "components/glass";
import Link from "next/link";
import type { ReactNode } from "react";
import { Stack } from "@mui/system";

/**
 * Contains the floating nav bar for larger displays.
 * @param props - The component properties.
 * @param props.pages - The pages to display in the nav.
 * @param props.contrastButton - The button to toggle the contrast effect.
 * @returns The floating nav bar.
 */
export function Floating({ pages, contrastButton }: {
    pages: Array<{ icon: ReactNode; label: string; link: string; }>;
    contrastButton?: ReactNode;
}): ReactNode {
    const isScrolling: boolean = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

    const links = pages.map((page, i) => (
        <MenuItem component={Link} href={page.link} key={i}>
            <Stack direction="row" spacing={1} alignItems="center">
                {page.icon}
                <Typography>{page.label}</Typography>
            </Stack>
        </MenuItem>
    ));

    const styles = {
        borderRadius: "100vh",
        display: "flex",
        left: "50%",
        padding: "0 !important",
        position: "fixed",
        top: "1rem",
        transform: "translateX(-50%)",
        zIndex: 1,
    };

    return (
        <Glass sx={styles} disabled={!isScrolling}>
            {links}
            {contrastButton}
        </Glass>
    );
}
