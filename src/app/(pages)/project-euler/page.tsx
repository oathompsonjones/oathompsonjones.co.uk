import { ProjectEulerClient } from "components/pages/project-euler/pageClient";
import type { ReactNode } from "react";
import { getParam } from "utils";

/**
 * This page contains my project euler solutions.
 * @param props - The page properties.
 * @param props.searchParams - Search parameter promise from Next.js routing.
 * @returns An element displaying my project euler solutions.
 */
export default async function ProjectEuler({ searchParams }: {
    searchParams: Promise<Record<string, string[] | string | undefined>>;
}): Promise<ReactNode> {
    const params = await searchParams;
    const rawProblem = getParam(params.problem);
    const parsedProblem = rawProblem === null ? Number.NaN : Number.parseInt(rawProblem, 10);
    const initialProblem = Number.isNaN(parsedProblem) || parsedProblem < 1 ? 1 : parsedProblem;

    return <ProjectEulerClient initialProblem={initialProblem} />;
}
