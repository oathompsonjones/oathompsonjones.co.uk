import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { GRAVATAR_URL } from "utils";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/**
 * Contains the bio segment for my CV page.
 *
 * @returns {JSX.Element} The Bio element.
 */
export default function Bio(): JSX.Element {
    return (
        <Paper sx={{ padding: "1rem" }}>
            <Typography variant="h4">Biography</Typography>
            <Divider sx={{ m: "1.25% 0%" }} />
            <Stack direction="row">
                <Avatar src={GRAVATAR_URL} sx={{ height: "10%", m: "1rem", width: "10%" }} />
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
                <br /><br />
                Currently, I'm reading for a degree in Computer Science at the University of Edinburgh.
                I'm familiar with several programming languages, including (but not limited to) JavaScript/TypeScript,
                Python, C/C++, C# and Java, and I'm able to pick up new languages quickly.
                A selection of my work can be found <Link href="/portfolio">here</Link>.
            </Typography>
        </Paper>
    );
}
