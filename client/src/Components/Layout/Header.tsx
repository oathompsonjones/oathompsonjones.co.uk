import { AppBar, Box, Container, IconButton, Menu, MenuItem, Stack, Toolbar, Typography, useTheme } from "@mui/material";
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon, Menu as MenuIcon } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AdaptiveTypography } from "../";
import type { MouseEvent } from "react";
import { PagesContext } from "../../Contexts";

/**
 * Creates the header element.
 *
 * @param {({ toggleTheme(): void; })} props An object containing the component props.
 * @param {Function} props.toggleTheme Function to toggle the website theme.
 * @returns {JSX.Element} The page header.
 */
export const Header = ({ toggleTheme }: { toggleTheme: () => void; }): JSX.Element => {
    // Handles behaviour for the dropdown menu on smaller displays.
    const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>): void => setAnchorElNav(event.currentTarget);
    const handleCloseNavMenu = (): void => setAnchorElNav(null);

    // Access the pages whose links need rendering in the navbar.
    const pages = useContext(PagesContext);

    // Access the site theme.
    const { palette: { mode: theme } } = useTheme();

    // Returns an AppBar element (which renders as an HTML header element).
    return (
        <AppBar enableColorOnDark position="sticky" sx={{ backgroundImage: "none", mb: "1%" }}>
            {/* This Container only renders when printing. */}
            <Container maxWidth="xl" sx={{ display: "none", displayPrint: "block" }}>
                <Stack direction="row">
                    <Typography flexGrow={1} variant="h3">Oliver Jones</Typography>
                    <Typography flexGrow={1} variant="h4">oathompsonjones@gmail.com</Typography>
                </Stack>
            </Container>
            {/* This Container does not render when printing. */}
            <Container maxWidth="xl" sx={{ displayPrint: "none" }}>
                {/* Toolbar is essential for properly aligning elements within the AppBar. */}
                <Toolbar disableGutters variant="dense">
                    {/* This Box contains the nav bar for smaller displays. */}
                    <Box sx={{ display: { md: "none", xs: "flex" }, flexGrow: 1 }}>
                        {/* Displays the menu icon to access the dropdown nav menu. */}
                        <IconButton color="inherit" onClick={handleOpenNavMenu} size="large">
                            <MenuIcon />
                        </IconButton>
                        {/* Contains the dropdown nav menu. */}
                        <Menu
                            anchorEl={anchorElNav}
                            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                            keepMounted
                            onClose={handleCloseNavMenu}
                            open={Boolean(anchorElNav)}
                            sx={{ display: { md: "none", xs: "block" } }}
                            transformOrigin={{ horizontal: "left", vertical: "top" }}
                        >
                            {
                                // Renders a link to each page.
                                pages.map((page, i) => (
                                    <MenuItem component="a" href={page.link} key={i} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.label}</Typography>
                                    </MenuItem>
                                ))
                            }
                        </Menu>
                    </Box>
                    {/* Displays the main page title for the nav bar. This renders on displays of any size. */}
                    <AdaptiveTypography
                        href="/"
                        noWrap
                        sx={{
                            color:          "inherit",
                            flexGrow:       { md: 0, xs: 1 },
                            fontFamily:     "monospace",
                            fontWeight:     700,
                            letterSpacing:  ".3rem",
                            mr:             2,
                            textDecoration: "none"
                        }}
                        variant="h5"
                        xs="OATHOMPSONJONES"
                    />
                    {/* This Box contains the nav bar for larger displays. */}
                    <Box sx={{ display: { md: "flex", xs: "none" }, flexGrow: 1 }}>
                        {
                            // Renders a link to each page.
                            pages.map((page, i) => (
                                <MenuItem component="a" href={page.link} key={i} sx={{ color: "white", display: "block", my: 2 }}>
                                    {page.label}
                                </MenuItem>
                            ))
                        }
                    </Box>
                    {/* Renders a button to control dark/light theme. This renders on displays of any size. */}
                    <IconButton color="inherit" edge="end" onClick={toggleTheme} style={{ float: "right" }} sx={{ mr: 2 }}>
                        {theme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
