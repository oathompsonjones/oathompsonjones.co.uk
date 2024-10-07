import { MenuItem, Typography } from "@mui/material";
import Box from "components/layout/box";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Contains the fixed nav bar for larger displays.
 * @param props - The component properties.
 * @param props.pages - The pages to display in the nav.
 * @returns The fixed nav bar.
 */
export function Fixed({ pages }: { pages: Array<{ label: string; link: string; }>; }): ReactNode {
    return (
        <Box sx={{ display: "flex", flex: 1 }}>
            {pages.map((page, i) => (
                <MenuItem
                    component={Link}
                    href={page.link}
                    key={i}
                    sx={{ transition: "background-color 0.25s linear" }}
                >
                    <Typography>{page.label}</Typography>
                </MenuItem>
            ))}
        </Box>
    );
}
