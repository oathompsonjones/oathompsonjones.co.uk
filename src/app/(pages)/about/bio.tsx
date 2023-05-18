import { Avatar, Divider, Paper, Stack, Typography } from "@mui/material";
import { GRAVATAR_URL } from "utils";
import Link from "next/link";
import Name from "./name";

/**
 * Contains the bio segment for my CV page.
 *
 * @returns {JSX.Element} The Bio element.
 */
export default function Bio(): JSX.Element {
    return (
        <Paper sx={{ p: "1%" }}>
            <Typography variant="h4">Biography</Typography>
            <Divider sx={{ m: "1.25% 0%" }} />
            <Stack alignItems="center" direction={{ md: "row" }}>
                <Avatar
                    src={GRAVATAR_URL}
                    sx={{
                        height: { lg: "30%", md: "50%", sm: "70%", xl: "20%", xs: "90%" },
                        m: "1%",
                        width: { lg: "30%", md: "50%", sm: "70%", xl: "20%", xs: "90%" }
                    }}
                />
                <Stack direction="column" flex={1} justifyContent="center" sx={{ width: "100%" }}>
                    <Typography variant="h6">Name</Typography>
                    <Name />
                    <Divider flexItem sx={{ m: "1.25% 0%" }} />
                    <Typography variant="h6">Nationality</Typography>
                    <Typography>British</Typography>
                    <Divider flexItem sx={{ m: "1.25% 0%" }} />
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
            <br />
            <Typography>
                I am an ambitious, hard-working person, able to work well even under stressful conditions.
                I'm able to work effectively with a group of like-minded colleagues and have experience managing teams,
                yet I'm also able to work effectively alone.
                I take pride in completing all tasks on time and to the highest standard.
                <br /><br />
                I'm currently reading for a degree in Computer Science at the University of Edinburgh.
                I'm familiar with several programming languages, including (but not limited to) JavaScript/TypeScript,
                Python, C/C++, C# and Java, and I'm able to pick up new languages quickly.
                A selection of my work can be found <Link href="/portfolio">here</Link>.
            </Typography>
        </Paper>
    );
}
