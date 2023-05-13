import { Box, MenuItem, Typography } from "@mui/material";
import Link from "next/link";

/**
 * Contains nav bar for larger displays.
 *
 * @returns {JSX.Element} The large nav.
 */
export default function LargeNav({ pages }: { pages: Array<{ label: string; link: string; }>; }): JSX.Element {
    return (
        <Box sx={{ display: { md: "flex", xs: "none" }, flex: 1 }}>
            {pages.map((page, i) => (
                <MenuItem component={Link} href={page.link} key={i}>
                    <Typography>{page.label}</Typography>
                </MenuItem>
            ))}
        </Box>
    );
}
