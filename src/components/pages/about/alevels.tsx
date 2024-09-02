import { Grade } from "./grade";
import { Grades } from "./grades";
import type { ReactNode } from "react";
import cv from "assets/cv.json";

/**
 * Contains the A-Levels segment for my CV page.
 * @returns The ALevels element.
 */
export function ALevels(): ReactNode {
    const grades = Object.entries(cv.Qualifications["The Bishop's Stortford High School — 2014-2021"]["A-Levels"])
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
