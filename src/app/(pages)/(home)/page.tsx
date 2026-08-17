import { GRAVATAR_URL } from "utils";
import Image from "next/image";
import type { ReactNode } from "react";
import { Stack } from "@mui/system";
import { Button, Typography } from "@mui/material";

/**
 * This is the home page.
 * @returns The home page.
 */
export default function Home(): ReactNode {
    return (
        <>
            <Stack direction="column" sx={{ alignItems: "center", gap: 0, justifyContent: "center" }}>
                <Image
                    className="avatar"
                    alt="A photo of me from the University of Edinburgh's 2024 Infball."
                    src={GRAVATAR_URL}
                    style={{
                        borderRadius: "50%",
                        height: "auto",
                        maxWidth: "90vw",
                    }}
                    width={400}
                    height={400}
                    preload
                />
                <Typography align="center" variant="h1">Oliver Jones</Typography>
                <Typography align="center" variant="h3" color="text.secondary">
                    Software Developer | Park Place Technologies
                </Typography>
                <Typography align="center" variant="h4" color="text.secondary">
                    BSc Computer Science | The University of Edinburgh
                </Typography>
                <Stack direction={{ sm: "row", xs: "column" }} spacing={2} sx={{ justifyContent: "center", p: 1 }}>
                    <Button href="/portfolio" variant="outlined">View featured projects</Button>
                    <Button href="/contact" variant="outlined">Get in touch</Button>
                </Stack>
            </Stack>
        </>
    );
}
