import { Divider, Paper, Typography } from "@mui/material";
import { Br } from "@/components/br";
import type { ReactElement } from "react";

/**
 * Contains the experience segment for my CV page.
 *
 * @returns {JSX.Element} The Experience element.
 */
export function Experience(): JSX.Element {
    // Contains the data for the experience section of my CV.
    const experiences: Array<{ content: ReactElement; heading: string; }> = [
        {
            content: (
                <>
                    <a href="https://www.arm.com">ARM Holding</a> are one of the world's leading semiconductor and software design
                    companies.
                    <Br />
                    During my day at ARM, I was shown how ARM operates on a day-to-day basis, giving me a good sense of how leading
                    companies work.
                </>
            ),
            heading: "ARM Holdings Work Experience Day - 02/12/2019"
        }, {
            content: (
                <>
                    <a href="https://bitsolutions.net">Bit Solutions</a> are an IT management company. They have partnerships with
                    several leading technology companies in order to provide their clients with industry leading cloud, hybrid and on
                    premise IT solutions.
                    <Br />
                    During my week at Bit Solutions, I experienced what it is like to work in the IT management sector, visiting
                    clients' sites, and learning how to setup and manage various systems for those clients.
                </>
            ),
            heading: "Bit Solutions Work Experience - June 2018"
        }, {
            content: (
                <>
                    As a senior prefect, I was responsible for assisting the school's Sixth Form Management Team throughout the year,
                    and representing the school in various events such as open evenings.
                </>
            ),
            heading: "TBSHS Senior Prefect - 2020-2021"
        }, {
            content: (
                <>
                    <a href="https://tbshs-interact.github.io">Interact</a> is a long-running fundraising organisation at
                    <a href="https://tbshs.org">The Bishop's Stortford High School</a>, working closely with the
                    <a href="http://bsrotary.org">Rotary Club of Bishop's Stortford</a> to organise events and campaigns, raising
                    money for local, national and global charities.
                    <Br />
                    My role as president entailed chairing our weekly meetings, and overseeing the organisation and running of events.
                </>
            ),
            heading: "TBSHS Interact President - Member 2014-2021 - President 2020-2021"
        }, {
            content: (
                <>
                    My role involved the management of other Library Helpers to ensure the smooth running of the system, as well as
                    weekly meetings to discuss how things went that week, and any plans for the next week.
                </>
            ),
            heading: "TBSHS Volunteer Library Helper & Committee Member - 2014-2019"
        }, {
            content: (
                <>
                    This involved weekly tutoring of year 7 and 8 students to help with their studies in mathematics at
                    <a href="https://tbshs.org">The Bishop's Stortford High School</a>.
                </>
            ),
            heading: "Paired Numeracy - 2021"
        }
    ];

    return (
        <Paper sx={{ padding: "1rem" }}>
            <Typography variant="h4">Experience</Typography>
            {
                experiences.map(({ content, heading }) => (
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
