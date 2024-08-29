import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Desktop } from "components/desktop";
import Link from "next/link";
import { ProfilePicture } from "components/pages/home/profilePicture";
import type { ReactElement } from "react";
import { age } from "utils";
import { useWindowSize } from "hooks/useWindowSize";

/**
 * The about section of the home page.
 * @returns The about section of the home page.
 */
export function About(): ReactElement {
    const { height, width } = useWindowSize();
    const [orientation, setOrientation] = useState<"landscape" | "portrait">("portrait");

    useEffect(() => {
        setOrientation(height < width ? "landscape" : "portrait");
    }, [height, width]);

    return (
        <>
            <Stack sx={{ alignItems: "center" }} direction={orientation === "landscape" ? "row-reverse" : "column"} spacing="2rem">
                <Desktop>
                    <ProfilePicture positioner />
                </Desktop>
                <Stack>
                    <Typography variant="h1">Hi, I'm Ollie</Typography>
                    <Typography
                        variant="h4"
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        sx={{ "-webkit-text-stroke-color": "black", "-webkit-text-stroke-width": "1px", color: "secondary.main" }}
                    >
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
