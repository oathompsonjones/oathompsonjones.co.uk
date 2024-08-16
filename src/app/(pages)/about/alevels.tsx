import Grade from "./grade";
import Grades from "./grades";
import type { ReactElement } from "react";

/**
 * Contains the A-Levels segment for my CV page.
 * @returns The ALevels element.
 */
export default function ALevels(): ReactElement {
    return (
        <Grades
            attainmentYear={2021}
            educationLevel="A-Levels"
            institutionLink="https://tbshs.org"
            institutionName="The Bishop's Stortford High School"
            maxGrade="A*"
            minGrade="E"
        >
            <Grade grade="A*" subject="Computer Science" />
            <Grade grade="B" subject="Further Mathematics" />
            <Grade grade="A*" subject="Mathematics" />
            <Grade grade="A*" subject="Physics" />
        </Grades>
    );
}
