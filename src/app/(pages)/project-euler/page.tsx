"use client";

import type { ChangeEvent, ReactNode } from "react";
import { IconButton, Typography } from "@mui/material";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useEffect, useState } from "react";
import { Code } from "components/pages/project-euler/code";
import { CodeWrapper } from "components/pages/project-euler/codeWrapper";
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
    const [hasMounted, setHasMounted] = useState(false);

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
    const problemCode = (useFetch<string>(problemFile, "text") ?? "404: Not Found").replace(
        "404: Not Found",
        "// The solution to this problem is not available. I may not have solved it yet, or it may not exist.",
    );
    const problemData = useFetch<Response>(`/api/project-euler?problem=${problem}`, "json");
    const title = problemData?.title ?? "";
    const description = problemData?.description ?? "";

    const utilsFile = "https://raw.githubusercontent.com/oathompsonjones/Project-Euler/master/src/utils.ts";
    const utilsCode = (useFetch<string>(utilsFile, "text") ?? "404: Not Found").replace(
        "404: Not Found",
        "// Something went wrong while fetching the utils file, please try again later.",
    );

    useEffect(() => {
        if (hasMounted)
            window.location.hash = problem.toString();
    }, [problem]);

    useEffect(() => {
        setHasMounted(true);

        if (window.location.hash !== "" && !isNaN(Number(window.location.hash.slice(1))))
            setProblem(Number(window.location.hash.slice(1)));

        hljs.highlightAll();
    }, []);

    return (
        <>
            <style>{/* CSS */`
                .plain-input {
                    background: none;
                    border: none;
                    font: inherit;
                    outline: none;
                    padding: 0;
                    margin: 0.5rem;
                    text-align: center;
                    width: ${problem.toString().length}ch;
                }
                .plain-input[type=number]::-webkit-outer-spin-button,
                .plain-input[type=number]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                .plain-input[type=number] {
                    appearance: textfield;
                    -moz-appearance: textfield;
                }
            `}</style>
            <Typography textAlign="center" variant="h4" color="inherit">
                <IconButton onClick={prev} className="monospace">
                    <strong>&lt;|</strong>
                </IconButton>
                <Link className="monospace" href={`https://projecteuler.net/problem=${problem}`}>
                    Problem
                </Link>
                <input className="monospace plain-input" type="number" value={problem} onChange={inputHandler} />
                <IconButton onClick={next} className="monospace">
                    <strong>|&gt;</strong>
                </IconButton>
            </Typography>
            <CodeWrapper>
                <div style={{ overflow: "auto", padding: "1rem" }}>
                    <Typography className="monospace" textAlign="center" color="secondary" variant="h5">
                        {title}
                    </Typography>
                    <MathJaxContext config={{ options: { enableMenu: false } }}>
                        <MathJax dynamic>
                            <Typography
                                className="monospace"
                                variant="body1"
                                /* eslint-disable @typescript-eslint/naming-convention */
                                sx={{ ".center": { textAlign: "center" }, ".red": { color: "red" } }}
                                dangerouslySetInnerHTML={{ __html: description }}
                                /* eslint-enable @typescript-eslint/naming-convention */
                            />
                        </MathJax>
                    </MathJaxContext>
                </div>
            </CodeWrapper>
            <div>
                <Typography className="monospace" textAlign="center" variant="h4" color="inherit">
                    Solution
                </Typography>
                <Code>{problemCode}</Code>
            </div>
            <div>
                <Typography className="monospace" textAlign="center" variant="h4" color="inherit">
                    Utils
                </Typography>
                <Code>{utilsCode}</Code>
            </div>
        </>
    );
}
