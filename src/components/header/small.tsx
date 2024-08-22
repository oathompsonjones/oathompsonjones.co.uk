import { Box, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import type { ReactElement } from "react";

/**
 * Contains the nav bar for smaller displays.
 * @param props - The component properties.
 * @param props.isOpen - Whether the nav is open.
 * @param props.pages - The pages to display in the nav.
 * @param props.toggleNavOpen - Toggles the nav open.
 * @returns The nav bar for smaller displays.
 */
export function SmallNav({ isOpen, pages, toggleNavOpen }: {
    isOpen: boolean;
    pages: Array<{ label: string; link: string; }>;
    toggleNavOpen: () => void;
}): ReactElement {
    return (
        <Box alignItems="center" sx={{ display: isOpen ? "block" : "none" }}>
            {pages.map((page, i) => (
                <MenuItem
                    component={Link}
                    href={page.link}
                    key={i}
                    onClick={toggleNavOpen}
                    sx={{
                        justifyContent: "center",
                        transition: "background-color 0.25s linear",
                        width: "100%",
                    }}
                >
                    <Typography>{page.label}</Typography>
                </MenuItem>
            ))}
        </Box>
    );
}
