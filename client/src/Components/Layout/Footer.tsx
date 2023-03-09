import { Avatar, Container, Divider, Link, Stack, Typography } from "@mui/material";
import { Email, Facebook, GitHub, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { Discord } from "../";
import Pfp from "../../Images/pfp.jpg";
import type { ReactElement } from "react";

/**
 * Contains the footer element.
 *
 * @param {{ backgroundColour: string; borderColour: string; footerHeight: string; }} props An object containing the component props.
 * @param {string} props.backgroundColour The footer's background colour.
 * @param {string} props.borderColour The footer's border colour.
 * @param {string} props.footerHeight A CSS height value which determines the footer's height.
 * @returns {JSX.Element} The page footer.
 */
export const Footer = ({ backgroundColour, borderColour, footerHeight }: {
    backgroundColour: string; borderColour: string; footerHeight: string;
}): JSX.Element => {
    // Links a URL and an icon for each social media to display in the footer.
    const socials: Array<{ icon: ReactElement; link: string; }> = [
        { icon: <GitHub />, link: "/github" },
        { icon: <LinkedIn />, link: "/linkedin" },
        { icon: <Discord />, link: "/discord" },
        { icon: <Twitter />, link: "/twitter" },
        { icon: <Instagram />, link: "/instagram" },
        { icon: <Facebook />, link: "/facebook" },
        { icon: <Email />, link: "/email" }
    ];

    // Returns an HTML footer element.
    return (
        <footer style={{
            backgroundColor: backgroundColour,
            borderTop: `5px solid ${borderColour}`,
            bottom: 0,
            maxHeight: footerHeight,
            overflow: "hidden",
            padding: "1%",
            position: "absolute",
            width: "100%"
        }}
        >
            {/* This Container will not be visible when printing a page. */}
            <Container sx={{ displayPrint: "none" }}>
                {/* This Stack holds two more Stacks, and puts a Divider between the two. */}
                <Stack divider={<Divider sx={{ margin: "0.5%" }} />}>
                    {/* This stack renders all internal elements horizontally instead of vertically. */}
                    <Stack alignItems="center" direction="row">
                        {/* My profile picture and name appear on the left. */}
                        <Avatar src={Pfp} sx={{ margin: "1%" }} />
                        <Stack flexGrow={1}>
                            <Typography variant="h6">Oliver Andrew</Typography>
                            <Typography variant="h6">Thompson Jones</Typography>
                        </Stack>
                        {/* The social media links are rendered on the right. */}
                        {socials.map(({ icon, link }, i) => <Link color="inherit" href={link} key={i}>{icon}</Link>)}
                    </Stack>
                    {/* This stack renders all internal elements horizontally instead of vertically,
                    and puts a Divider between each element. */}
                    <Stack direction="row" divider={<Divider flexItem orientation="vertical" sx={{ margin: "0% 1%" }} />}>
                        {/* My username, and a legend saying who made the site appear at the bottom of the footer. */}
                        <Typography align="right" flexGrow={1} variant="caption">oathompsonjones</Typography>
                        <Typography variant="caption">
                            Website created by <a href="https://oathompsonjones.co.uk">Oliver Jones</a>
                        </Typography>
                    </Stack>
                </Stack>
            </Container>
        </footer>
    );
};
