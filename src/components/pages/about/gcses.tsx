import type { CV } from "app/(pages)/cv/route";
import { Grade } from "./grade";
import { Grades } from "./grades";
import type { ReactNode } from "react";
import cv from "assets/cv.json";

const data = cv as CV;

/**
 * Contains the GCSEs segment for my CV page.
 * @returns The GCSEs element.
 */
export function GCSEs(): ReactNode {
    if (!data.Qualifications[1] || Array.isArray(data.Qualifications[1].grades))
        return null;

    const grades = Object.entries(data.Qualifications[1].grades.GCSEs!)
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
