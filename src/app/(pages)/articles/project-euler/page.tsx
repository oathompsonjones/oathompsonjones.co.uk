"use client";

import { useEffect, useState } from "react";
import { Glass } from "components/glass";
import Link from "next/link";
import type { ReactNode } from "react";
import { Typography } from "@mui/material";

/**
 * Renders a card for an article.
 * @returns An element which renders an article card.
 */
export default function ProjectEuler(): ReactNode {
    const [url, setURL] = useState("");

    useEffect(() => setURL(window.location.origin), []);

    return (
        <Glass>
            <Typography variant="h1">
                Project Euler
            </Typography>
            <Typography variant="caption">
                The following 3 sections were taken from the <Link href="https://projecteuler.net/">Project Euler
                    website</Link> in March 2026.
            </Typography>
            <Typography variant="h3">
                What is Project Euler?
            </Typography>
            <Typography variant="body1">
                Project Euler is a series of challenging mathematical/computer programming problems that will require
                more than just mathematical insights to solve. Although mathematics will help you arrive at elegant and
                efficient methods, the use of a computer and programming skills will be required to solve most problems.
                <br /><br />
                The motivation for starting Project Euler, and its continuation, is to provide a platform for the
                inquiring mind to delve into unfamiliar areas and learn new concepts in a fun and recreational context.
            </Typography>
            <Typography variant="h3">
                Who are the problems aimed at?
            </Typography>
            <Typography variant="body1">
                The intended audience include students for whom the basic curriculum is not feeding their hunger to
                learn, adults whose background was not primarily mathematics but had an interest in things mathematical,
                and professionals who want to keep their problem solving and mathematics on the cutting edge.
                <br /><br />
                Currently we have 1376731 registered members who have solved at least one problem, representing 220
                locations throughout the world, and collectively using 114 different programming languages to solve the
                problems.
            </Typography>
            <Typography variant="h3">
                Can anyone solve the problems?
            </Typography>
            <Typography variant="body1">
                The problems range in difficulty and for many the experience is inductive chain learning. That is, by
                solving one problem it will expose you to a new concept that may allow you to undertake a previously
                inaccessible problem. So determined participants will be able to slowly but surely work their way
                through the problems.
            </Typography>
            <Typography variant="h2">
                My Solutions
            </Typography>
            <Typography variant="body1">
                As a brief overview of my GitHub profile will tell you, my prefered programming language is TypeScript.
                As such, my solutions are written in a Node.JS TypeScript environment.
                For obvious reasons, this means that my solutions are not necessarily the most efficient.
                Aside from the language limitations, many of my solutions are not as algorithmically efficient as they
                could be, however, they do all run in a reasonable time frame on my laptop.
                <br /><br />
                All of my solutions can be found here: <Link href="/project-euler">{url}/project-euler</Link>.
                For specific solutions, you can search for the problem number,
                e.g. <Link href="/project-euler?problem=59">{url}/project-euler?problem=59</Link>.
                <br /><br />
                You can also find my solutions on <Link href="https://github.com/oathompsonjones/project-euler">
                    GitHub</Link>.
            </Typography>
        </Glass>
    );
}
