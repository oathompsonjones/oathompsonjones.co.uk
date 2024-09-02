import { Grade } from "./grade";
import { Grades } from "./grades";
import type { ReactNode } from "react";
import cv from "assets/cv.json";

/**
 * Contains the GCSEs segment for my CV page.
 * @returns The GCSEs element.
 */
export function GCSEs(): ReactNode {
    const grades = Object.entries(cv.Qualifications["The Bishop's Stortford High School — 2014-2021"].GCSEs)
        .map(([subject, grade], i) => (<Grade grade={grade} key={i} subject={subject} />));

    return (
        <Grades
            attainmentYear={2019}
            educationLevel="GCSEs"
            institutionLink="https://tbshs.org"
            institutionName="The Bishop's Stortford High School"
            maxGrade={9}
            minGrade={1}
        >
            {grades}
        </Grades>
    );
}
