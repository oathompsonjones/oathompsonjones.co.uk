import { Avatar, Typography } from "@mui/material";
import { GRAVATAR_URL, age } from "utils";
import Grid from "components/layout/grid";
import type { ReactNode } from "react";
import Stack from "components/layout/stack";
import cv from "assets/cv.json";
import { jsonToJSDoc } from "app/(pages)/cv";

/**
 * Contains the bio segment for my CV page.
 * @returns The Bio element.
 */
export function Bio(): ReactNode {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid size={{ md: 4, sm: 5, xs: 12 }}>
                    <Avatar src={GRAVATAR_URL} sx={{ height: "auto", width: "100%" }} />
                </Grid>
                <Grid size={{ md: 8, sm: 7, xs: 12 }}>
                    <Stack direction="column" sx={{ height: "100%", justifyContent: "center" }}>
                        <Typography sx={{ whiteSpace: "pre-wrap" }}>
                            {[
                                "Hi, I'm Ollie.",
                                `I'm ${age()} years old, studying Computer Science at the University of Edinburgh.`,
                                jsonToJSDoc(cv.Summary),
                            ].join(" ").split("\n").join("\n\n")}
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
}
