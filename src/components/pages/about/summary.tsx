import { Grid, Stack } from "@mui/system";
import { Avatar } from "@mui/material";
import { Bio } from "./bio";
import { GRAVATAR_URL } from "utils";
import type { ReactNode } from "react";

/**
 * Contains the summary segment for my CV page.
 * @returns The Summary element.
 */
export function Summary(): ReactNode {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid
                    size={{ md: 2, xs: 12 }} sx={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                    }}>
                    <Avatar src={GRAVATAR_URL} sx={{ height: "auto", width: "100%" }} />
                </Grid>
                <Grid size={{ md: 10, xs: 12 }}>
                    <Stack direction="column" sx={{ height: "100%", justifyContent: "center" }}>
                        <Bio />
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
}
