import type { CV } from "app/(pages)/cv/route";
import { Grade } from "./grade";
import { Grades } from "./grades";
import type { ReactNode } from "react";
import cv from "assets/cv.json";

const data = cv as CV;

/**
 * Contains the A-Levels segment for my CV page.
 * @returns The ALevels element.
 */
export function ALevels(): ReactNode {
    if (!data.Qualifications[1] || Array.isArray(data.Qualifications[1].grades))
        return null;

    const grades = Object.entries(data.Qualifications[1].grades["A Levels"]!)
        .map(([subject, grade], i) => (<Grade grade={grade} key={i} subject={subject} />));

    return (
        <Grades
            attainmentYear={2021}
            educationLevel="A-Levels"
            institutionLink="https://tbshs.org"
            institutionName="The Bishop's Stortford High School"
            maxGrade="A*"
            minGrade="E"
        >
            {grades}
        </Grades>
    );
}
