"use client";

import { Stack, Typography } from "@mui/material";
import type { ReactElement } from "react";
import ProfilePicture from "./profilePicture";
import Link from "next/link";
import { age } from "utils";

/**
 * A div which will be used to either fade in or out.
 * @param children - The children.
 * @returns A div.
 */
export default function About(): ReactElement {
    return (
        <>
            <Stack alignItems="center" direction={{ md: "row-reverse" }} spacing="2rem">
                <ProfilePicture positioner />
                <Stack>
                    <Typography variant="h1">Hi, I'm Ollie</Typography>
                    <Typography color="secondary" variant="h4">
                        I'm {age()} years old, studying undergraduate Computer Science at the University of Edinburgh.
                        I have a passion for programming, which stems from a love of solving problems.
                        I direct that passion towards writing high quality code, creating efficient and robust solutions
                        to the problems presented to me.
                        Take a look at my CV <Link href="/about">here</Link>.
                    </Typography>
                </Stack>
            </Stack>
        </>
    );
}
