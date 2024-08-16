import { Grade } from "./grade";
import { Grades } from "./grades";
import type { ReactElement } from "react";

/**
 * Contains the University segment for my CV page.
 * @returns The University element.
 */
export function University(): ReactElement {
    return (
        <Grades
            attainmentYear={2025}
            educationLevel="Further Education"
            institutionLink="https://ed.ac.uk"
            institutionName="The University of Edinburgh"
            maxGrade={<>1<sup>st</sup></>}
            minGrade={<>3<sup>rd</sup></>}
        >
            <Grade grade={<>1<sup>st</sup></>} subject="1st Year" />
            <Grade grade={<>Upper 2<sup>nd</sup></>} subject="2nd Year" />
            <Grade grade={<>1<sup>st</sup></>} subject="3rd Year" />
            <Grade grade="TBD" subject="4th Year" />
            <Grade grade="TBD" subject="Final Grade" />
        </Grades>
    );
}
