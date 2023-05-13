import { Box, MenuItem, Typography } from "@mui/material";
import Link from "next/link";

interface IProps {
    backgroundColor: string;
    handleNavMenu: () => void;
    pages: Array<{ label: string; link: string; }>;
}

/**
 * Contains the nav bar for smaller displays.
 *
 * @returns {JSX.Element} The small nav.
 */
export default function SmallNav({ backgroundColor, handleNavMenu, pages }: IProps): JSX.Element {
    return (
        <Box
            alignItems="center"
            sx={{ backgroundColor, height: "100%", width: "100%" }}
        >
            {pages.map((page, i) => (
                <MenuItem
                    component={Link}
                    href={page.link}
                    key={i}
                    onClick={handleNavMenu}
                    sx={{ justifyContent: "center", width: "100%" }}
                >
                    <Typography>{page.label}</Typography>
                </MenuItem>
            ))}
        </Box>
    );
}
