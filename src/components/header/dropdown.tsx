import { MenuItem, Typography } from "@mui/material";
import Box from "components/layout/box";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Contains the drop down nav bar for smaller displays.
 * @param props - The component properties.
 * @param props.isOpen - Whether the nav is open.
 * @param props.pages - The pages to display in the nav.
 * @param props.toggleNavOpen - Toggles the nav open.
 * @returns The drop down nav bar.
 */
export function Dropdown({ isOpen, pages, toggleNavOpen }: {
    isOpen: boolean;
    pages: Array<{ label: string; link: string; }>;
    toggleNavOpen: () => void;
}): ReactNode {
    return (
        <Box
            sx={{ alignItems: "center", display: "var(--display)" }}
            // eslint-disable-next-line @typescript-eslint/naming-convention
            style={{ "--display": isOpen ? "block" : "none" }}
        >
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