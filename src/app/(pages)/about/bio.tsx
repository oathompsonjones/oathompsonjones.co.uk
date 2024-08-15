import { Avatar, Divider, Grid, Stack, Typography } from "@mui/material";
import { GRAVATAR_URL, age } from "utils";
import Link from "next/link";
import Name from "components/name";
import type { ReactElement } from "react";

/**
 * Contains the bio segment for my CV page.
 * @returns The Bio element.
 */
export default function Bio(): ReactElement {
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
                I am an ambitious, hard-working person, able to work well even under stressful conditions.
                I'm able to work effectively with a group of like-minded colleagues and have experience managing teams,
                yet I'm also able to work effectively alone.
                I take pride in completing all tasks on time and to the highest standard.
                <br /><br />
                I'm currently reading for a degree in Computer Science at the University of Edinburgh.
                I'm familiar with several programming languages, including (but not limited to) JavaScript/TypeScript,
                Python, C/C++, C#, Java and Haskell, and I'm able to pick up new languages quickly.
                A selection of my work can be found <Link href="/portfolio">here</Link>.
            </Typography>
        </>
    );
}
