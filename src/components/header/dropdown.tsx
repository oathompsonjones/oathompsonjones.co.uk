import { MenuItem, Typography } from "@mui/material";
import Box from "components/layout/box";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Contains the drop down nav bar for smaller displays.
 * @param props - The component properties.
 * @param props.pages - The pages to display in the nav.
 * @param props.toggleNavOpen - Toggles the nav open.
 * @returns The drop down nav bar.
 */
export function Dropdown({ pages, toggleNavOpen }: {
    pages: Array<{ label: string; link: string; }>;
    toggleNavOpen: () => void;
}): ReactNode {
    return (
        <Box sx={{ alignItems: "center" }}>
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
