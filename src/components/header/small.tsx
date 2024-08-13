import { Box, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import type { ReactElement } from "react";
import useOutsideClick from "hooks/useOutsideClick";

/**
 * Contains the nav bar for smaller displays.
 * @returns The small nav.
 */
export default function SmallNav({ backgroundColor, open, pages, toggleNavOpen }: Readonly<{
    backgroundColor: string;
    open: boolean;
    pages: Array<{ label: string; link: string; }>;
    toggleNavOpen: () => void;
}>): ReactElement {
    const ref = useOutsideClick(toggleNavOpen);

    return (
        <Box
            alignItems="center"
            ref={ref}
            sx={{
                backgroundColor,
                display: open ? "block" : "none",
                height: "100%",
                width: "100%"
            }}
        >
            {pages.map((page, i) => (
                <MenuItem
                    component={Link}
                    href={page.link}
                    key={i}
                    sx={{ justifyContent: "center", width: "100%" }}
                >
                    <Typography>{page.label}</Typography>
                </MenuItem>
            ))}
        </Box>
    );
}
