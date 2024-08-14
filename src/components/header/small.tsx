import { Box, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import type { ReactElement } from "react";

/**
 * Contains the nav bar for smaller displays.
 * @returns The small nav.
 */
export default function SmallNav({ isOpen, pages, toggleNavOpen }: Readonly<{
    isOpen: boolean;
    pages: Array<{ label: string; link: string; }>;
    toggleNavOpen: () => void;
}>): ReactElement {
    return (
        <Box alignItems="center" sx={{ display: isOpen ? "block" : "none", }}>
            {pages.map((page, i) => (
                <MenuItem
                    component={Link}
                    href={page.link}
                    key={i}
                    onClick={toggleNavOpen}
                    sx={{ justifyContent: "center", width: "100%" }}
                >
                    <Typography>{page.label}</Typography>
                </MenuItem>
            ))}
        </Box>
    );
}
