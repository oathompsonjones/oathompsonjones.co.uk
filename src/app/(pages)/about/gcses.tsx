import Grade from "./grade";
import type { ReactElement } from "react";
import Grades from "./grades";

/**
 * Contains the GCSEs segment for my CV page.
 * @returns The GCSEs element.
 */
export default function GCSEs(): ReactElement {
    return (
        <Grades
            attainmentYear={2019}
            educationLevel="GCSEs"
            institutionLink="https://tbshs.org"
            institutionName="The Bishop's Stortford High School"
            maxGrade={9}
            minGrade={1}
        >
            <Grade grade="8" subject="Biology" />
            <Grade grade="7" subject="Chemistry" />
            <Grade grade="8" subject="Computer Science" />
            <Grade grade="8" subject="English Language" />
            <Grade grade="7" subject="English Literature" />
            <Grade grade="7" subject="French" />
            <Grade grade="8" subject="History" />
            <Grade grade="8" subject="Mathematics" />
            <Grade grade="8" subject="Physics" />
        </Grades>
    );
}
