import { Bio } from "components/pages/about/bio";
import { GRAVATAR_URL } from "utils";
import Image from "next/image";
import type { ReactNode } from "react";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";

/**
 * This is the home page.
 * @returns The home page.
 */
export default function Home(): ReactNode {
    return (
        <>
            <Stack direction="column" sx={{ alignItems: "center", justifyContent: "center" }} gap={0}>
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
                        Software Developer
                </Typography>
            </Stack>
            <Bio large />
        </>
    );
}
