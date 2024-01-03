import { Box, MenuItem, Typography } from "@mui/material";
import Link from "next/link";

/**
 * Contains nav bar for larger displays.
 *
 * @returns The large nav.
 */
export default function LargeNav({ pages }: { readonly pages: Array<{ label: string; link: string; }>; }): React.ReactElement {
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
