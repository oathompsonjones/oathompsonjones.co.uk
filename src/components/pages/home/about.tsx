import Link from "next/link";
import { ProfilePicture } from "components/pages/home/profilePicture";
import type { ReactNode } from "react";
import { Size } from "components/size";
import Stack from "components/layout/stack";
import { Typography } from "@mui/material";
import { age } from "utils";
import { useOrientation } from "hooks/useOrientation";

/**
 * The about section of the home page.
 * @returns The about section of the home page.
 */
export function About(): ReactNode {
    const orientation = useOrientation();

    return (
        <div className="full-width">
            <Stack
                sx={{ alignItems: "center" }}
                direction={orientation === "landscape" ? "row-reverse" : "column"}
                spacing="2rem"
            >
                <Size lg={<ProfilePicture positioner />} />
                <Stack>
                    <Typography variant="h1">Hi, I'm Ollie</Typography>
                    <Typography variant="h4" color="white">
                        I'm {age()} years old, studying undergraduate Computer Science at the University of Edinburgh.
                        I have a passion for programming, which stems from a love of solving problems.
                        I direct that passion towards writing high quality code, creating efficient and robust solutions
                        to the problems presented to me.
                        Take a look at my CV <Link href="/about" style={{ pointerEvents: "auto" }}>here</Link>.
                    </Typography>
                </Stack>
            </Stack>
        </div>
    );
}
