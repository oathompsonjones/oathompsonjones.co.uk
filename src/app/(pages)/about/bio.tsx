import { Avatar, Divider, Paper, Stack, Typography } from "@mui/material";
import { AVATAR_URL } from "@/constants";
import { Br } from "@/components/br";
import Link from "next/link";

/**
 * Contains the bio segment for my CV page.
 *
 * @returns {JSX.Element} The Bio element.
 */
export function Bio(): JSX.Element {
    return (
        <Paper sx={{ padding: "1rem" }}>
            <Typography variant="h4">Biography</Typography>
            <Divider sx={{ m: "1.25% 0%" }} />
            <Stack direction="row">
                <Avatar src={AVATAR_URL} sx={{ height: 0.25, m: "1rem", width: 0.25 }} />
                <Stack direction="column" flexGrow={1} justifyContent="center">
                    <Typography variant="h6">Name</Typography>
                    <Typography><b>O</b>liver <b>A</b>ndrew <b>Thompson Jones</b></Typography>
                    <Divider flexItem sx={{ margin: "1.25% 0%" }} />
                    <Typography variant="h6">Nationality</Typography>
                    <Typography>British</Typography>
                    <Divider flexItem sx={{ margin: "1.25% 0%" }} />
                    <Typography variant="h6">Age</Typography>
                    <Typography>
                        {((): number => {
                            const today: Date = new Date();
                            const birthDate: Date = new Date(2003, 0, 2);
                            return today.getMonth() - birthDate.getMonth() <= 0 && today.getDate() < birthDate.getDate()
                                ? today.getFullYear() - birthDate.getFullYear() - 1
                                : today.getFullYear() - birthDate.getFullYear();
                        })()}
                    </Typography>
                </Stack>
            </Stack>
            <Typography>
                I am an ambitious, hard-working person, able to work well under stressful conditions.
                I'm able to work effectively with a group of like-minded colleagues and have experience managing teams,
                yet I'm also able to work effectively alone.
                I take pride in completing all tasks on time and to the highest standard.
                <Br lines={2} />
                Currently, I'm reading for a degree in Computer Science at the University of Edinburgh.
                I'm familiar with several programming languages, including (but not limited to) JavaScript/TypeScript,
                Python, C/C++, C# and Java, and I'm able to pick up new languages quickly.
                A selection of my work can be found <Link href="/portfolio">here</Link>.
            </Typography>
        </Paper>
    );
}