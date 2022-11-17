import { Avatar, Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { Br } from "../Components";
import Pfp from "../Images/pfp.jpg";
import { ReactElement } from "react";

export const About = (): JSX.Element => {
    document.title = "Oliver Jones | About Me";

    const experiences: Array<{ content: ReactElement; heading: string; }> = [{
        content: <>
            <a href="https://www.arm.com">ARM Holding</a> are one of the world's leading semiconductor and software design companies.
            <Br />
            During my day at ARM, I was shown how ARM operates on a day-to-day basis, giving me a good sense of how leading companies work.
        </>,
        heading: "ARM Holdings Work Experience Day - 02/12/2019"
    }, {
        content: <>
            <a href="https://bitsolutions.net">Bit Solutions</a> are an IT management company.
            They have partnerships with several leading technology companies in order to provide their clients with industry leading cloud, hybrid and on premise IT solutions.
            <Br />
            During my week at Bit Solutions, I experienced what it is like to work in the IT management sector, visiting clients' sites,
            and learning how to setup and manage various systems for those clients.
        </>,
        heading: "Bit Solutions Work Experience - June 2018"
    }, {
        content: <>
            As a senior prefect, I was responsible for assisting the school's Sixth Form Management Team throughout the year,
            and representing the school in various events such as open evenings.
        </>,
        heading: "TBSHS Senior Prefect - 2020-2021"
    }, {
        content: <>
            <a href="https://tbshs-interact.github.io">Interact</a> is a long-running fundraising organisation at <a href="https://tbshs.org">The Bishop's Stortford High School</a>,
            working closely with the <a href="http://bsrotary.org">Rotary Club of Bishop's Stortford</a> to organise events and campaigns,
            raising money for local, national and global charities.
            <Br />
            My role as president entailed chairing our weekly meetings, and overseeing the organisation and running of events.
        </>,
        heading: "TBSHS Interact President - Member 2014-2021 - President 2020-2021"
    }, {
        content: <>
            My role involved the management of other Library Helpers to ensure the smooth running of the system,
            as well as weekly meetings to discuss how things went that week, and any plans for the next week.
        </>,
        heading: "TBSHS Volunteer Library Helper & Committee Member - 2014-2019"
    }, {
        content: <>
            This involved weekly tutoring of year 7 and 8 students to help with their studies in mathematics at <a href="https://tbshs.org">The Bishop's Stortford High School</a>.
        </>,
        heading: "Paired Numeracy - 2021"
    }];

    const skills: Array<{ content: ReactElement; heading: string; }> = [{
        content: <>
            I am highly proficient with usual IT skills such as word processing and use of spreadsheets,
            and I am also an experienced programmer with knowledge of multiple languages.
            <Br />
            Some of the programming languages I am familiar with are TypeScript, Java, C#, Haskell, PHP, C++, Python and more.
        </>,
        heading: "IT & Programming"
    }, {
        content: <>
            I'm able to identify a problems find efficient solutions for them. I'm also able to write computer programs to solve problems more quickly.
        </>,
        heading: "Problem Solving"
    }, {
        content: <>
            With A* grades in A-Level Maths and Further Maths, and with further study in Maths being essential to my chosen degree, I am highly skilled in Mathematics.
        </>,
        heading: "Numeracy"
    }, {
        content: <>
            While public speaking is not something I'd rush towards, I am more than capable when the occasion arises.
            I was chosen to speak in my school's Christmas and Easter church services every year from year 7 to year 13,
            and was asked to represent the school (and my family) during the memorial service for a former headmaster, <a href="https://tbshs.org/ian-shaw-tbshs-1980-1998/">Ian Shaw</a>.
        </>,
        heading: "Public Speaking"
    }, {
        content: <>
            My excellent time management skills allow me to complete tasks to high standards while meeting all deadlines,
            as well as being able to juggle multiple tasks at once.
        </>,
        heading: "Time Management"
    }, {
        content: <>
            Being able to work well in a team is an essential skill to the workplace, one which I have demonstrated through work as a volunteer Library Helper for 5 years
            and through working as part of the Interact team for 7 years.
        </>,
        heading: "Teamwork"
    }];

    return <Container>
        <Typography variant="h2">
            About Me
        </Typography>
        <Grid container spacing={2} sx={{ mb: "1rem" }}>
            <Grid item xs={12}>
                <Paper sx={{ padding: "1rem" }}>
                    <Typography variant="h4">
                        Biography
                    </Typography>
                    <Divider sx={{ m: "1.25% 0%" }} />
                    <Stack direction="row">
                        <Avatar src={Pfp} sx={{ height: 0.25, m: "1rem", width: 0.25 }} />
                        <Stack direction="column" justifyContent="center" flexGrow={1}>
                            <Typography variant="h6">
                                Name
                            </Typography>
                            <Typography>
                                <b>O</b>liver <b>A</b>ndrew <b>Thompson Jones</b>
                            </Typography>
                            <Divider sx={{ margin: "1.25% 0%" }} flexItem />
                            <Typography variant="h6">
                                Nationality
                            </Typography>
                            <Typography>
                                British
                            </Typography>
                            <Divider sx={{ margin: "1.25% 0%" }} flexItem />
                            <Typography variant="h6">
                                Age
                            </Typography>
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
                        I'm able to work effectively with a group of like-minded colleagues and have experience managing teams, yet I'm also able to work effectively alone.
                        I take pride in completing all tasks on time and to the highest standard.
                        <Br lines={2} />
                        Currently, I'm reading for a degree in Computer Science at the University of Edinburgh.
                        I'm familiar with several programming languages, including (but not limited to) TypeScript, Java and C#, and I'm able to pick up new languages quickly.
                        A selection of my work can be found <a href="/portfolio">here</a>.
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper sx={{ display: "flex", flexDirection: "column", height: 1, padding: "0.5rem 1rem" }}>
                    <Typography variant="h4">
                        GCSEs
                    </Typography>
                    <Divider sx={{ margin: "1.25% 0%" }} />
                    <Stack direction="row" flexGrow={1}>
                        <Typography flexGrow={1}>
                            Biology <Br />
                            Chemistry <Br />
                            Computer Science <Br />
                            English Language <Br />
                            English Literature <Br />
                            French <Br />
                            History <Br />
                            Mathematics <Br />
                            Physics <Br />
                        </Typography>
                        <Typography flexGrow={1}>
                            8 <Br />
                            7 <Br />
                            8 <Br />
                            8 <Br />
                            7 <Br />
                            7 <Br />
                            8 <Br />
                            8 <Br />
                            8 <Br />
                        </Typography>
                    </Stack>
                    <Divider sx={{ margin: "1.25% 0%" }} />
                    <Typography variant="caption" sx={{ bottom: 0 }}>
                        Attained at <a href="https://tbshs.org">The Bishop's Stortford High School</a> in 2019.
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper sx={{ display: "flex", flexDirection: "column", height: 1, padding: "0.5rem 1rem" }}>
                    <Typography variant="h4">
                        A-Levels
                    </Typography>
                    <Divider sx={{ margin: "1.25% 0%" }} />
                    <Stack direction="row" flexGrow={1}>
                        <Typography flexGrow={1}>
                            Computer Science <Br />
                            Further Mathematics <Br />
                            Mathematics <Br />
                            Physics <Br />
                        </Typography>
                        <Typography flexGrow={1}>
                            A* <Br />
                            B  <Br />
                            A* <Br />
                            A* <Br />
                        </Typography>
                    </Stack>
                    <Divider sx={{ margin: "1.25% 0%" }} />
                    <Typography variant="caption" sx={{ bottom: 0 }}>
                        Attained at <a href="https://tbshs.org">The Bishop's Stortford High School</a> in 2021.
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper sx={{ display: "flex", flexDirection: "column", height: 1, padding: "0.5rem 1rem" }}>
                    <Typography variant="h4">
                        Further Education
                    </Typography>
                    <Divider sx={{ margin: "1.25% 0%" }} />
                    <Typography flexGrow={1}>
                        Currently studying Undergraduate Computer Science at the University of Edinburgh.
                    </Typography>
                    <Stack direction="row" flexGrow={1}>
                        <Typography flexGrow={1}>
                            1st Year <Br />
                            2nd Year <Br />
                            3rd Year <Br />
                            4th Year <Br />
                        </Typography>
                        <Typography flexGrow={1}>
                            I   <Br />
                            TBD <Br />
                            TBD <Br />
                            TBD <Br />
                        </Typography>
                    </Stack>
                    <Divider sx={{ margin: "1.25% 0%" }} />
                    <Typography variant="caption" sx={{ bottom: 0 }}>
                        Studying at <a href="https://ed.ac.uk">The University of Edinburgh</a> since 2021.
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ padding: "1rem" }}>
                    <Typography variant="h4">Experience</Typography>
                    {experiences.map(({ content, heading }) => <>
                        <Divider sx={{ margin: "1.25% 0%" }} />
                        <Typography variant="subtitle1">
                            {heading}
                        </Typography>
                        <Typography variant="body2">
                            {content}
                        </Typography>
                    </>)}
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ padding: "1rem" }}>
                    <Typography variant="h4">
                        Skills
                    </Typography>
                    {skills.map(({ content, heading }) => <>
                        <Divider sx={{ margin: "1.25% 0%" }} />
                        <Typography variant="subtitle1">
                            {heading}
                        </Typography>
                        <Typography variant="body2">
                            {content}
                        </Typography>
                    </>)}
                </Paper>
            </Grid>
        </Grid>
    </Container>;
};
