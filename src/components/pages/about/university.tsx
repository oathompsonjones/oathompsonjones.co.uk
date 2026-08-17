import type { CV } from "app/(pages)/cv/route";
import { Grade } from "./grade";
import { Grades } from "./grades";
import type { ReactNode } from "react";
import cv from "assets/cv.json";

const data = cv as CV;

/**
 * Contains the University segment for my CV page.
 * @returns The University element.
 */
export function University(): ReactNode {
    /* eslint-disable @typescript-eslint/naming-convention */
    const gradeMap: Record<string, ReactNode> = {
        1: <>1<sup>st</sup></>,
        "2:1": <>Upper 2<sup>nd</sup></>,
        "2:2": <>Lower 2<sup>nd</sup></>,
        3: <>3<sup>rd</sup></>,
    };
    /* eslint-enable @typescript-eslint/naming-convention */
    const qualification = data.Qualifications[0];

    if (!qualification || !Array.isArray(qualification.grades))
        return null;

    const suffix = (value: number): string => {
        if (value % 100 >= 11 && value % 100 <= 13)
            return "th";

        if (value % 10 === 1)
            return "st";

        if (value % 10 === 2)
            return "nd";

        if (value % 10 === 3)
            return "rd";

        return "th";
    };
    const numericYear = Number.parseInt(qualification.time.split("-").at(-1) ?? "", 10);
    const maxAvailableGrade = gradeMap["1"];
    const minAvailableGrade = gradeMap["3"];
    const grades = qualification.grades.map((grade, i, allGrades) => {
        const subject = i === allGrades.length - 1
            ? <>Final Grade</>
            : <>{i + 1}<sup>{suffix(i + 1)}</sup> Year</>;

        return <Grade grade={gradeMap[grade] ?? grade} key={i} subject={subject} />;
    });

    return (
        <Grades
            attainmentYear={Number.isNaN(numericYear) ? 2025 : numericYear}
            educationLevel="University"
            institutionLink="https://www.ed.ac.uk"
            institutionName={qualification.institution}
            maxGrade={maxAvailableGrade}
            minGrade={minAvailableGrade}
        >
            {grades}
        </Grades>
    );
}
