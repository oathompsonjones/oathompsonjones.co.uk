import { Divider, Paper, Typography } from "@mui/material";
import { Br } from "@/components/br";
import type { ReactElement } from "react";

/**
 * Contains the skills segment for my CV page.
 *
 * @returns {JSX.Element} The Skills element.
 */
export function Skills(): JSX.Element {
    // Contains the data for the skills section of my CV.
    const skills: Array<{ content: ReactElement; heading: string; }> = [
        {
            content: (
                <>
                    I am highly proficient with usual IT skills such as word processing and use of spreadsheets, and I am also an
                    experienced programmer with knowledge of multiple languages.
                    <Br />
                    Some of the programming languages I am familiar with are TypeScript, Java, C#, Haskell, PHP, C++, Python and more.
                </>
            ),
            heading: "IT & Programming"
        }, {
            content: (
                <>
                    I'm able to identify problems and find efficient solutions for them. I'm also able to write computer programs to
                    solve problems more quickly.
                </>
            ),
            heading: "Problem Solving"
        }, {
            content: (
                <>
                    With an A* grade in A-Level Maths, a B grade in A-Level Further Maths, and with further study in Maths being
                    essential to my chosen degree, I am highly skilled in Mathematics.
                </>
            ),
            heading: "Numeracy"
        }, {
            content: (
                <>
                    While public speaking is not something I'd rush towards, I am more than capable when the occasion arises. I was
                    chosen to speak in my school's Christmas and Easter church services every year from year 7 to year 13, and was
                    asked to represent the school (and my family) during the memorial service for a former
                    headmaster, <a href="https://tbshs.org/ian-shaw-tbshs-1980-1998/">Ian Shaw</a>.
                </>
            ),
            heading: "Public Speaking"
        }, {
            content: (
                <>
                    My excellent time management skills allow me to complete tasks to high standards while meeting all deadlines, as
                    well as being able to juggle multiple tasks at once.
                </>
            ),
            heading: "Time Management"
        }, {
            content: (
                <>
                    Being able to work well in a team is an essential skill to the workplace, one which I have demonstrated through
                    work as a volunteer in my school library for 5 years and through working as part of the Interact team for 7 years.
                    (See the experiences section above for more details).
                </>
            ),
            heading: "Teamwork"
        }
    ];

    return (
        <Paper sx={{ padding: "1rem" }}>
            <Typography variant="h4">Skills</Typography>
            {
                skills.map(({ content, heading }) => (
                    <>
                        <Divider sx={{ margin: "1.25% 0%" }} />
                        <Typography variant="subtitle1">{heading}</Typography>
                        <Typography variant="body2">{content}</Typography>
                    </>
                ))
            }
        </Paper>
    );
}
