"use server";

import type { ActionResponse } from ".";

/**
 * Gets information about a project Euler problem.
 * @param problem - The number of the project Euler problem.
 * @returns Information about a project Euler problem.
 */
export async function getProblem(problem: number): Promise<ActionResponse<{ description: string; title: string; }>> {
    const data = { description: "Unknown", title: "Unknown" };

    try {
        const descResponse = await fetch(`https://projecteuler.net/minimal=${problem}`);

        data.description = descResponse.ok
            ? (await descResponse.text())
                .replaceAll(/href="(.+)"/g, "href=https://projecteuler.net/$1")
                .replaceAll(/\${1,2}([^$]+)\${1,2}/g, "\\($1\\)")
            : "Unknown";
    } catch (error) {
        return {
            error: error instanceof Error
                ? error
                : new Error("Failed to fetch the description."),
            success: false,
        };
    }

    try {
        const titleResponse = await fetch("https://projecteuler.net/minimal=problems;csv");

        data.title = titleResponse.ok
            ? (await titleResponse.text())
                .split("\n")
                .find((line) => line.startsWith(`${problem},`))
                ?.match(/"(.*?)"/)?.[1]
                ?.replaceAll(/href="(.+)"/g, "href=https://projecteuler.net/$1")
                .replaceAll(/\${1,2}([^$]+)\${1,2}/g, "\\($1\\)") ?? "Unknown"
            : "Unknown";
    } catch (error) {
        return {
            error: error instanceof Error
                ? error
                : new Error("Failed to fetch the title."),
            success: false,
        };
    }

    return {
        data,
        success: true,
    };
}

/**
 * Gets the solution to a project Euler problem.
 * @param problem - The number of the project Euler problem.
 * @returns The solution to a project Euler problem.
 */
export async function getSolution(problem: number): Promise<ActionResponse<string>> {
    const pad = (n: number): string => `${n}`.padStart(3, "0");
    const closest50 = problem % 50 === 0 ? problem : Math.floor(problem / 50) * 50 + 50;
    const closest10 = problem % 10 === 0 ? problem : Math.floor(problem / 10) * 10 + 10;
    const path = `${pad(closest50 - 49)}-${pad(closest50)}/${pad(closest10 - 9)}-${pad(closest10)}/${pad(problem)}.ts`;
    const url = `https://raw.githubusercontent.com/oathompsonjones/Project-Euler/master/src/${path}`;

    try {
        const data = await (await fetch(url)).text();

        return {
            data,
            success: true,
        };
    } catch (error) {
        return {
            error: error instanceof Error
                ? error
                : new Error("Failed to fetch the solution to this problem."),
            success: false,
        };
    }
}

/**
 * Gets the utils file for project Euler problems.
 * @returns The utils file for project Euler problems.
 */
export async function getUtils(): Promise<ActionResponse<string>> {
    const url = "https://raw.githubusercontent.com/oathompsonjones/Project-Euler/master/src/utils.ts";

    try {
        const data = await (await fetch(url)).text();

        return {
            data,
            success: true,
        };
    } catch (error) {
        return {
            error: error instanceof Error
                ? error
                : new Error("Failed to fetch the utils file for project Euler problems."),
            success: false,
        };
    }
}
