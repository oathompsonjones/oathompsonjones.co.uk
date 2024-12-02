"use client";

import type { ChangeEvent, ReactNode } from "react";
import { IconButton, Typography } from "@mui/material";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { getProblem, getSolution, getUtils } from "actions/projectEuler";
import { useEffect, useState } from "react";
import { Code } from "components/pages/project-euler/code";
import { CodeWrapper } from "components/pages/project-euler/codeWrapper";
import Link from "next/link";
import hljs from "highlight.js/lib/common";

/**
 * This page contains my project euler solutions.
 * @returns An element displaying my project euler solutions.
 */
export default function ProjectEuler(): ReactNode {
    const [problem, setProblem] = useState(1);
    const [hasMounted, setHasMounted] = useState(false);

    const [{ description, title }, setDescription] = useState({ description: "Loading...", title: "Loading..." });
    const [solution, setSolution] = useState("Loading...");
    const [utils, setUtils] = useState("Loading...");

    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => setProblem(Math.max(1, Number(e.target.value)));
    const prev = (): void => setProblem((p) => Math.max(1, p - 1));
    const next = (): void => setProblem((p) => p + 1);

    useEffect(() => {
        if (hasMounted) {
            window.location.hash = problem.toString();

            getProblem(problem)
                .then((response) => {
                    if (response.success) {
                        setDescription(response.data);
                    } else {
                        setDescription({
                            description: "Failed to fetch the description.",
                            title: "Failed to fetch the title.",
                        });
                    }
                })
                .catch(() => undefined);
            getSolution(problem)
                .then((response) => setSolution(
                    response.success
                        ? response.data
                        : "// The solution to this problem is not available." +
                    "I may not have solved it yet, or it may not exist.",
                ))
                .catch(() => undefined);
        }
    }, [problem, hasMounted]);

    useEffect(() => {
        setHasMounted(true);

        if (window.location.hash !== "" && !isNaN(Number(window.location.hash.slice(1))))
            setProblem(Number(window.location.hash.slice(1)));

        getUtils()
            .then((response) => setUtils(
                response.success
                    ? response.data
                    : "// Something went wrong while fetching the utils file, please try again later.",
            ))
            .catch(() => undefined);

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
                    <MathJaxContext config={{ options: { enableMenu: false } }}>
                        <MathJax dynamic>
                            <Typography
                                className="monospace"
                                textAlign="center"
                                color="secondary"
                                variant="h5"
                                /* eslint-disable @typescript-eslint/naming-convention */
                                dangerouslySetInnerHTML={{ __html: title }}
                                /* eslint-enable @typescript-eslint/naming-convention */
                            />
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
                <Code>{solution}</Code>
            </div>
            <div>
                <Typography className="monospace" textAlign="center" variant="h4" color="inherit">
                    Utils
                </Typography>
                <Code>{utils}</Code>
            </div>
        </>
    );
}
