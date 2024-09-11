"use client";

import type { ChangeEvent, ReactNode } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useEffect, useState } from "react";
import { Code } from "components/pages/project-euler/code";
import type { Response } from "app/api/project-euler/route";
import { Typography } from "@mui/material";
import hljs from "highlight.js/lib/common";
import styles from "styles/project-euler.module.css";
import { useFetch } from "hooks/useFetch";

/**
 * This page contains my project euler solutions.
 * @returns An element displaying my project euler solutions.
 */
export default function ProjectEuler(): ReactNode {
    const [problem, setProblem] = useState<number>(1);

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
        .replace("404: Not Found", "// Something went wrong fetching the problem. I may not have a solution yet.");
    const problemData = useFetch<Response>(`/api/project-euler?problem=${problem}`, "json");
    const title = problemData?.title ?? "";
    const description = problemData?.description ?? "";

    const utilsFile = "https://raw.githubusercontent.com/oathompsonjones/Project-Euler/master/src/utils.ts";
    const utilsCode = (useFetch<string>(utilsFile, "text") ?? "404: Not Found")
        .replace("404: Not Found", "// Something went wrong.");

    useEffect(() => hljs.highlightAll(), []);

    return (
        <div className={styles.wrapper}>
            <Typography
                variant="h2"
                color="inherit"
                sx={{
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    ":after": { content: { md: "'||===>>'" } },
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    ":before": { content: { md: "'<<===||'" } },
                }}
            >
                Project Euler
            </Typography>
            <Typography variant="h4" color="inherit">
                <button className={styles.button} onClick={prev}>&lt;|</button>
                <a href={`https://projecteuler.net/problem=${problem}`}>Problem</a>
                <input type="number" className={styles.input} min="1" value={problem} onChange={inputHandler} />
                <button className={styles.button} onClick={next}>|&gt;</button>
            </Typography>

            <Typography color="secondary" variant="h5">{title}</Typography>
            <MathJaxContext config={{
                asciimath: { delimiters: [["$", "$"]], displaystyle: true },
                loader: { load: ["input/asciimath"] },
            }}>
                <MathJax inline dynamic>
                    <Typography
                        variant="body1"
                        component="span"
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                </MathJax>
                <Code>{problemCode}</Code>
            </MathJaxContext>

            <Typography variant="h4" color="inherit">Utils</Typography>
            <Code>{utilsCode}</Code>
        </div>
    );
}
