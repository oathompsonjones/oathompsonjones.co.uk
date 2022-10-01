import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon, Menu as MenuIcon } from "@mui/icons-material";
import React, { Component, MouseEvent } from "react";

export default class Header extends Component<{ colour: string; theme: "dark" | "light"; toggleTheme(): void; }, { anchorElNav: HTMLElement | null; }> {
    public constructor(public readonly props: { colour: string; theme: "dark" | "light"; toggleTheme(): void; }, public readonly state: { anchorElNav: HTMLElement | null; }) {
        super(props);
        this.state = {
            anchorElNav: null
        };
    }

    public render(): JSX.Element {
        const pages: Array<{ label: string; link: string; }> = [
            { label: "About Me", link: "/about" },
            { label: "Portfolio", link: "/portfolio" },
            { label: "Gallery", link: "/gallery" },
            { label: "Contact Me", link: "/contact" }
        ];

        const handleOpenNavMenu = (event: MouseEvent<HTMLElement>): void => {
            this.setState({ anchorElNav: event.currentTarget });
        };

        const handleCloseNavMenu = (): void => {
            this.setState({ anchorElNav: null });
        };

        return (
            <AppBar position="sticky" sx={{ background: this.props.colour, marginBottom: "1%" }} enableColorOnDark>
                <Container maxWidth="xl">
                    <Toolbar variant="dense" disableGutters>
                        {/* Contains the nav bar for mobile devices. */}
                        <Box sx={{ display: { md: "none", xs: "flex" }, flexGrow: 1 }}>
                            {/* Displays the menu icon to access the dropdown nav menu. */}
                            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit" >
                                <MenuIcon />
                            </IconButton>
                            {/* Contains the dropdown nav menu. */}
                            <Menu id="menu-appbar"
                                anchorEl={this.state.anchorElNav}
                                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                                keepMounted
                                transformOrigin={{ horizontal: "left", vertical: "top" }}
                                open={Boolean(this.state.anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { md: "none", xs: "block" } }}
                            >
                                {/* Renders a link to each page. */}
                                {pages.map((page) =>
                                    <MenuItem component="a" href={page.link} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.label}</Typography>
                                    </MenuItem>
                                )}
                            </Menu>
                        </Box>
                        {/* Displays the main page title for the mobile nav bar. */}
                        <Typography variant="h5" noWrap component="a" href="/" sx={{
                            color: "inherit",
                            display: { md: "none", xs: "flex" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            mr: 2,
                            textDecoration: "none"
                        }}>OATHOMPSONJONES</Typography>
                        {/* Displays the main page title for the full screen nav bar. */}
                        <Typography variant="h6" noWrap component="a" href="/" sx={{
                            color: "inherit",
                            display: { md: "flex", xs: "none" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            mr: 2,
                            textDecoration: "none"
                        }}>OATHOMPSONJONES</Typography>
                        {/* Contains the full screen nav bar. */}
                        <Box sx={{ display: { md: "flex", xs: "none" }, flexGrow: 1 }}>
                            {/* Renders a link to each page. */}
                            {pages.map((page) =>
                                <MenuItem component="a" href={page.link} onClick={handleCloseNavMenu} sx={{ color: "white", display: "block", my: 2 }}>
                                    {page.label}
                                </MenuItem>
                            )}
                        </Box>
                        {/* Buttons to control dark/light theme. */}
                        <IconButton edge="end" style={{ float: "right" }} sx={{ mr: 2 }} color="inherit" onClick={(): void => void this.props.toggleTheme()}>
                            {this.props.theme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }
}