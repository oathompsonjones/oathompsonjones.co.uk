import { Grade } from "./grade";
import { Grades } from "./grades";
import type { ReactNode } from "react";
import cv from "assets/cv.json";

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
        TBD: "TBD",
    };
    /* eslint-enable @typescript-eslint/naming-convention */
    const order = [
        <>1<sup>st</sup> Year</>,
        <>2<sup>nd</sup> Year</>,
        <>3<sup>rd</sup> Year</>,
        <>4<sup>th</sup> Year</>,
        <>Final Grade</>,
    ];
    const grades = cv.Qualifications["The University of Edinburgh — 2021-2025"].grades
        .map((grade, i) => (<Grade grade={gradeMap[grade]} key={i} subject={order[i]} />));

    return (
        <Grades
            attainmentYear={2025}
            educationLevel="Further Education"
            institutionLink="https://www.ed.ac.uk"
            institutionName="The University of Edinburgh"
            maxGrade={<>1<sup>st</sup></>}
            minGrade={<>3<sup>rd</sup></>}
        >
            {grades}
        </Grades>
    );
}
