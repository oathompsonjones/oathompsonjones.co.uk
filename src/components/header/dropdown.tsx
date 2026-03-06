import { Box, Stack } from "@mui/system";
import { MenuItem, Typography } from "@mui/material";
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
    pages: Array<{ icon: ReactNode; label: string; link: string; }>;
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
                    sx={{ justifyContent: "center", width: "100%" }}
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        {page.icon}
                        <Typography>{page.label}</Typography>
                    </Stack>
                </MenuItem>
            ))}
        </Box>
    );
}
