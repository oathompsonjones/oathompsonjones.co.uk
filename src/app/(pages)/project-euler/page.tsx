"use client";

import type { ChangeEvent, ReactNode } from "react";
import { IconButton, Paper, Typography } from "@mui/material";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useEffect, useState } from "react";
import { Code } from "components/pages/project-euler/code";
import Link from "next/link";
import type { Response } from "app/api/project-euler/route";
import hljs from "highlight.js/lib/common";
import { useFetch } from "hooks/useFetch";

/**
 * This page contains my project euler solutions.
 * @returns An element displaying my project euler solutions.
 */
export default function ProjectEuler(): ReactNode {
    const [problem, setProblem] = useState(1);

    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => setProblem(Math.max(1, Number(e.target.value)));
    const prev = (): void => setProblem((p) => Math.max(1, p - 1));
    const next = (): void => setProblem((p) => p + 1);

    const problemFile = ((): string => {
        const p = (n: number): string => `${n}`.padStart(3, "0");
        const closest50 = problem % 50 === 0 ? problem : Math.floor(problem / 50) * 50 + 50;
        const closest10 = problem % 10 === 0 ? problem : Math.floor(problem / 10) * 10 + 10;
        const path = `${p(closest50 - 49)}-${p(closest50)}/${p(closest10 - 9)}-${p(closest10)}/${p(problem)}.ts`;

        return `https://raw.githubusercontent.com/oathompsonjones/Project-Euler/master/src/${path}`;
    })();
    const problemCode = (useFetch<string>(problemFile, "text") ?? "404: Not Found")
        .replace("404: Not Found", "// The solution to this problem is not available. I may not have solved it yet.");
    const problemData = useFetch<Response>(`/api/project-euler?problem=${problem}`, "json");
    const title = problemData?.title ?? "";
    const description = problemData?.description ?? "";

    const utilsFile = "https://raw.githubusercontent.com/oathompsonjones/Project-Euler/master/src/utils.ts";
    const utilsCode = (useFetch<string>(utilsFile, "text") ?? "404: Not Found")
        .replace("404: Not Found", "// Something went wrong while fetching the utils file, please try again later.");

    useEffect(() => hljs.highlightAll(), []);

    return (
        <>
            <Typography className="monospace" textAlign="center" variant="h4" color="inherit">
                <IconButton onClick={prev} className="monospace">
                    <strong>&lt;|</strong>
                </IconButton>
                <Link href={`https://projecteuler.net/problem=${problem}`}>Problem</Link>
                <input type="number" className="plain-input" min="1" value={problem} onChange={inputHandler} />
                <IconButton onClick={next} className="monospace">
                    <strong>|&gt;</strong>
                </IconButton>
            </Typography>
            <br />
            <Paper sx={{ border: "3px solid gray", padding: "1rem" }}>
                <Typography className="monospace" textAlign="center" color="secondary" variant="h5">
                    {title}
                </Typography>
                <MathJaxContext config={{ options: { enableMenu: false } }}>
                    <MathJax dynamic>
                        <Typography
                            className="monospace"
                            variant="body1"
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    </MathJax>
                </MathJaxContext>
            </Paper>
            <br />
            <Typography className="monospace" textAlign="center" variant="h4" color="inherit">
                Solution
            </Typography>
            <Code>{problemCode}</Code>
            <br />
            <Typography className="monospace" textAlign="center" variant="h4" color="inherit">
                Utils
            </Typography>
            <Code>{utilsCode}</Code>
        </>
    );
}
