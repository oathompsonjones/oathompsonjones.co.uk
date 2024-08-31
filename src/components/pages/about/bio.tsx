import { Avatar, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { GRAVATAR_URL, age } from "utils";
import { Name } from "components/footer/name";
import type { ReactElement } from "react";
import cv from "assets/cv.json";
import { jsonToJSDoc } from "api/cv";

/**
 * Contains the bio segment for my CV page.
 * @returns The Bio element.
 */
export function Bio(): ReactElement {
    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{ md: 4, xs: 12 }}>
                    <Avatar src={GRAVATAR_URL} sx={{ height: "auto", width: "100%" }} />
                </Grid>
                <Grid size={{ md: 8, xs: 12 }}>
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
                {jsonToJSDoc(cv.bio)}
            </Typography>
        </>
    );
}
