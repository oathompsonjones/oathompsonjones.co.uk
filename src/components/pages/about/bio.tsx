import { Avatar, Divider, Grid, Stack, Typography } from "@mui/material";
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
                <Grid item md={4} xs={12}>
                    <Avatar
                        src={GRAVATAR_URL}
                        sx={{ height: "auto", width: "100%" }}
                    />
                </Grid>
                <Grid item md={8} xs={12}>
                    <Stack direction="column" justifyContent="center" sx={{ height: "100%" }}>
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
            <Typography>
                {jsonToJSDoc(cv.bio)}
            </Typography>
        </>
    );
}
