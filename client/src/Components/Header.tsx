import { AppBar, Box, Container, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon, Menu as MenuIcon } from "@mui/icons-material";
import { MouseEvent, useState } from "react";
import { AdaptiveTypography } from "./";

export const Header = (props: { theme: "dark" | "light"; toggleTheme(): void; }): JSX.Element => {
    const pages: Array<{ label: string; link: string; }> = [
        { label: "About Me", link: "/about" },
        { label: "Portfolio", link: "/portfolio" },
        { label: "Gallery", link: "/gallery" },
        { label: "Contact Me", link: "/contact" }
    ];

    const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>): void => setAnchorElNav(event.currentTarget);
    const handleCloseNavMenu = (): void => setAnchorElNav(null);

    return <AppBar position="sticky" sx={{ backgroundImage: "none", mb: "1%" }} enableColorOnDark>
        {/* Print header. */}
        <Container maxWidth="xl" sx={{ display: "none", displayPrint: "block" }}>
            <Stack direction="row">
                <Typography variant="h3" flexGrow={1}>
                    Oliver Jones
                </Typography>
                <Typography variant="h4" flexGrow={1}>
                    oathompsonjones@gmail.com
                </Typography>
            </Stack>
        </Container>
        {/* Actual header. */}
        <Container maxWidth="xl" sx={{ displayPrint: "none" }}>
            <Toolbar variant="dense" disableGutters>
                {/* Contains the nav bar for mobile devices. */}
                <Box sx={{ display: { md: "none", xs: "flex" }, flexGrow: 1 }}>
                    {/* Displays the menu icon to access the dropdown nav menu. */}
                    <IconButton size="large" onClick={handleOpenNavMenu} color="inherit" >
                        <MenuIcon />
                    </IconButton>
                    {/* Contains the dropdown nav menu. */}
                    <Menu id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                        keepMounted
                        transformOrigin={{ horizontal: "left", vertical: "top" }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { md: "none", xs: "block" } }}
                    >
                        {/* Renders a link to each page. */}
                        {pages.map((page, i) =>
                            <MenuItem key={i} component="a" href={page.link} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">{page.label}</Typography>
                            </MenuItem>
                        )}
                    </Menu>
                </Box>
                {/* Displays the main page title for the nav bar. */}
                <AdaptiveTypography variant="h5" noWrap href="/" sx={{
                    color: "inherit",
                    flexGrow: { md: 0, xs: 1 },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    mr: 2,
                    textDecoration: "none"
                }} xs="OATHOMPSONJONES" />
                {/* Contains the full screen nav bar. */}
                <Box sx={{ display: { md: "flex", xs: "none" }, flexGrow: 1 }}>
                    {/* Renders a link to each page. */}
                    {pages.map((page, i) =>
                        <MenuItem key={i} component="a" href={page.link} onClick={handleCloseNavMenu} sx={{ color: "white", display: "block", my: 2 }}>
                            {page.label}
                        </MenuItem>
                    )}
                </Box>
                {/* Buttons to control dark/light theme. */}
                <IconButton edge="end" style={{ float: "right" }} sx={{ mr: 2 }} color="inherit" onClick={(): void => void props.toggleTheme()}>
                    {props.theme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
            </Toolbar>
        </Container>
    </AppBar>;
};