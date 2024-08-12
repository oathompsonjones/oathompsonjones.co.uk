import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import ProfilePicture from "./profilePicture";
import Link from "next/link";
import { age } from "utils";
import useWindowSize from "hooks/useWindowSize";
import Desktop from "components/desktop";

/**
 * The about section of the home page.
 * @returns The about section of the home page.
 */
export default function About(): ReactElement {
    const { height, width } = useWindowSize();
    const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");

    useEffect(() => {
        setOrientation(height < width ? "landscape" : "portrait");
    }, [height, width]);

    return (
        <>
            <Stack alignItems="center" direction={orientation === "landscape" ? "row-reverse" : "column"} spacing="2rem">
                <Desktop>
                    <ProfilePicture positioner />
                </Desktop>
                <Stack>
                    <Typography variant="h1">Hi, I'm Ollie</Typography>
                    <Typography color="secondary" variant="h4">
                        I'm {age()} years old, studying undergraduate Computer Science at the University of Edinburgh.
                        I have a passion for programming, which stems from a love of solving problems.
                        I direct that passion towards writing high quality code, creating efficient and robust solutions
                        to the problems presented to me.
                        Take a look at my CV <Link href="/about" style={{ pointerEvents: "auto" }}>here</Link>.
                    </Typography>
                </Stack>
            </Stack>
        </>
    );
}
