import { Avatar, Divider, Typography } from "@mui/material";
import { GRAVATAR_URL, age } from "utils";
import Grid from "components/layout/grid";
import { Name } from "components/footer/name";
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
        <>
            <Grid container spacing={2}>
                <Grid size={{ md: 4, sm: 5, xs: 6 }}>
                    <Avatar src={GRAVATAR_URL} sx={{ height: "auto", width: "100%" }} />
                </Grid>
                <Grid size={{ md: 8, sm: 7, xs: 6 }}>
                    <Stack direction="column" sx={{ height: "100%", justifyContent: "center" }}>
                        <Typography variant="h6">Name</Typography>
                        <Name id="bio" />
                        <Divider />
                        <Typography variant="h6">Nationality</Typography>
                        <Typography>British</Typography>
                        <Divider />
                        <Typography variant="h6">Age</Typography>
                        <Typography>{age()}</Typography>
                    </Stack>
                </Grid>
            </Grid>
            <br />
            <Typography sx={{ whiteSpace: "pre-wrap" }}>
                {jsonToJSDoc(cv.Bio)}
            </Typography>
        </>
    );
}
