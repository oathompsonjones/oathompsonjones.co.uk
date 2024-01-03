import { Box, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import useOutsideClick from "hooks/useOutsideClick";

interface IProps {
    readonly backgroundColor: string;
    readonly toggleNavOpen: () => void;
    readonly pages: Array<{ label: string; link: string; }>;
}

/**
 * Contains the nav bar for smaller displays.
 *
 * @returns The small nav.
 */
export default function SmallNav({ backgroundColor, toggleNavOpen, pages }: IProps): React.ReactElement {
    const ref = useOutsideClick(toggleNavOpen);
    return (
        <Box
            alignItems="center"
            ref={ref}
            sx={{ backgroundColor, height: "100%", width: "100%" }}
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
