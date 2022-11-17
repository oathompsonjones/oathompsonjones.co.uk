import { Avatar, Container, Divider, Link, Stack, Typography } from "@mui/material";
import { Email, Facebook, GitHub, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { Discord } from "./";
import Pfp from "../Images/pfp.jpg";
import { ReactElement } from "react";

export const Footer = (props: { backgroundColour: string; borderColour: string; footerHeight: string; }): JSX.Element => {
    const socials: Array<{ icon: ReactElement; link: string; }> = [
        { icon: <GitHub />, link: "/github" },
        { icon: <LinkedIn />, link: "/linkedin" },
        { icon: <Discord />, link: "/discord" },
        { icon: <Twitter />, link: "/twitter" },
        { icon: <Instagram />, link: "/instagram" },
        { icon: <Facebook />, link: "/facebook" },
        { icon: <Email />, link: "/email" }
    ];

    return <footer style={{
        backgroundColor: props.backgroundColour,
        borderTop: `5px solid ${props.borderColour}`,
        bottom: 0,
        maxHeight: props.footerHeight,
        overflow: "hidden",
        padding: "1%",
        position: "absolute",
        width: "100%"
    }}>
        <Container sx={{ displayPrint: "none" }}>
            <Stack divider={<Divider sx={{ margin: "0.5%" }} />}>
                <Stack direction="row" alignItems="center">
                    <Avatar src={Pfp} sx={{ margin: "1%" }} />
                    <Stack flexGrow={1}>
                        <Typography variant="h6">Oliver Andrew</Typography>
                        <Typography variant="h6">Thompson Jones</Typography>
                    </Stack>
                    {socials.map(({ icon, link }, i) =>
                        <Link key={i} color="inherit" href={link}>
                            {icon}
                        </Link>
                    )}
                </Stack>
                <Stack direction="row" divider={<Divider orientation="vertical" sx={{ margin: "0% 1%" }} flexItem />}>
                    <Typography variant="caption" align="right" flexGrow={1}>oathompsonjones</Typography>
                    <Typography variant="caption">Website created by <a href="https://oathompsonjones.co.uk">Oliver Jones</a></Typography>
                </Stack>
            </Stack>
        </Container>
    </footer>;
};